import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PostUserLoginResponse } from "@/app/api/users/login/route";

type Inputs = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(1, { message: "This field is required" }),
  password: z.string().min(1, { message: "This field is required" }),
});

export function useLoginForm() {
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
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = (await response.json()) as PostUserLoginResponse;

      if (!result.ok) {
        setErrorMessage(result.message || "Something went wrong");
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
