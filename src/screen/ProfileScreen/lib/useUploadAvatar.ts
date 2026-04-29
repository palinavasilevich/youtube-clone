import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadAvatar } from "@/app/api/users/uploadAvatar";

const schema = z.object({
  avatar: z
    .custom<FileList>(
      (val) => typeof FileList !== "undefined" && val instanceof FileList,
      { message: "Please select a file." },
    )
    .refine((list) => list.length > 0, {
      message: "Please select a file.",
    })
    .refine((list) => list.length === 0 || list[0].size < 5_000_000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (list) =>
        list.length === 0 ||
        ["image/jpeg", "image/png", "image/jpg"].includes(list[0].type),
      { message: "The file format must be either jpg, jpeg, or png." },
    ),
});

type FormInputs = z.infer<typeof schema>;

export function useUploadAvatar(userId: string, onClose: () => void) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const handleClose = () => {
    reset();
    setErrorMessage(null);
    onClose();
  };

  const onSubmitHandler: SubmitHandler<FormInputs> = async ({ avatar }) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await uploadAvatar({ userId, avatar: avatar[0] });

      if (result.ok) {
        router.refresh();
        handleClose();
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to upload avatar");
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
    onClose: handleClose,
  };
}
