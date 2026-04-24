"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/shared/constants/routes";
import { useLoginForm } from "@/screen/LoginScreen/lib/useLoginForm";
import { cn } from "@/shared/lib/css";
import { Loader } from "@/shared/components/Loader";
import cls from "./LoginScreen.module.css";

export function LoginScreen() {
  const { isLoading, errors, errorMessage, register, onSubmit } =
    useLoginForm();

  const hasUsernameError = !!errors.username?.message;
  const hasPasswordError = !!errors.password?.message;

  return (
    <div className={cls.container}>
      <div className={cls.content}>
        <div className={cls.leftPart}>
          <Image
            unoptimized
            src={"/googleLogo.svg"}
            width={48}
            height={48}
            alt=""
            aria-hidden="true"
            className={cls.icon}
          />
          <p className={cls.title}>Sign in</p>
          <p className={cls.subtitle}>to continue to YouTube</p>
        </div>

        <div>
          <form onSubmit={onSubmit} className={cls.form}>
            <label htmlFor="username" className={cls.label}>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className={cn(cls.input, hasUsernameError && cls.errorInput)}
                {...register("username")}
              />

              {hasUsernameError && (
                <p className={cls.inputErrorMessage}>
                  {errors.username?.message}
                </p>
              )}
            </label>

            <label htmlFor="password" className={cls.label}>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={cn(cls.input, hasPasswordError && cls.errorInput)}
                {...register("password")}
              />

              {hasPasswordError && (
                <p className={cls.inputErrorMessage}>
                  {errors.password?.message}
                </p>
              )}
            </label>

            {errorMessage && !hasUsernameError && !hasPasswordError && (
              <p className={cls.errorMessage}>{errorMessage}</p>
            )}

            <div className={cls.actions}>
              <Link href={ROUTES.REGISTER} className={cls.createAccountLink}>
                Create account
              </Link>
              <button
                type="submit"
                className={cls.signInButton}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={18} /> : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
