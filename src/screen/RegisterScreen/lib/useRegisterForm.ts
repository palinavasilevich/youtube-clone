import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

type Inputs = {
  login: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    login: z.string().min(1, { message: "This field is required" }),
    password: z.string().min(1, { message: "This field is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match",
  });

export function useRegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<Inputs> = async (data: Inputs) => {
    setErrorMessage(null);
    setIsLoading(true);

    const { login, password } = data;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result?.error || "Something went wrong");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    register,
    errors,
    onSubmit: handleSubmit(onSubmitHandler),
  };
}
