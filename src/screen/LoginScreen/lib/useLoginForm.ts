import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/app/api/users/login";

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

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await login(data);

      if (!response.ok) {
        setErrorMessage(response.message || "Login request failed");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Login request failed. Please try again.");
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
