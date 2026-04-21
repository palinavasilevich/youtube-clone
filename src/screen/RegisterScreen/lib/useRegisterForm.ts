import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Inputs = {
  login: string;
  password: string;
};

const schema = z.object({
  login: z.string().min(1, { message: "This field is required" }),
  password: z.string().min(1, { message: "This field is required" }),
});

export function useRegisterForm() {
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
      const response = await fetch("/api/users/login", {
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
