import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GetUserResponse } from "@/shared/types/api.types";

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
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Register request failed: ${response.status}`);
      }

      const data: GetUserResponse = await response.json();

      if (!data.ok) {
        setErrorMessage(data?.message || "Something went wrong");
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
