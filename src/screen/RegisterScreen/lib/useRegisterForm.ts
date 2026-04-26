import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "@/app/api/users/createUser";

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    username: z.string().min(1, { message: "This field is required" }),
    password: z.string().min(1, { message: "This field is required" }),
    confirmPassword: z.string().min(1, { message: "This field is required" }),
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

    const { username, password } = data;

    try {
      const response = await createUser({ username, password });

      if (!response.ok) {
        setErrorMessage(response?.message || "Register request failed");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Register request failed. Please try again.");
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
