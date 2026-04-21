"use client";

import Link from "next/link";
import { useLoginForm } from "@/screen/LoginScreen/lib/useLoginForm";
import { cn } from "@/shared/lib/css";
import cls from "./LoginScreen.module.css";

export function LoginScreen() {
  const { isLoading, errors, errorMessage, register, onSubmit } =
    useLoginForm();

  const hasLoginError = !!errors.login?.message;
  const hasPasswordError = !!errors.password?.message;

  return (
    <div className={cls.container}>
      <form onSubmit={onSubmit} className={cls.form}>
        <label htmlFor="login" className={cls.label}>
          <input
            id="login"
            type="text"
            placeholder="Enter your login"
            className={cn(cls.input, hasLoginError && cls.errorInput)}
            {...register("login")}
          />

          {hasLoginError && (
            <p className={cls.errorMessage}>{errors.login?.message}</p>
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
            <p className={cls.errorMessage}>{errors.password?.message}</p>
          )}
        </label>

        <div className={cls.actions}>
          <button
            type="submit"
            className={cls.submitButton}
            disabled={isLoading}
          >
            Sign in
          </button>
          <span>
            Don&apos;t have an account yet?{" "}
            <Link href={`/auth/register`} className={cls.createAccountLink}>
              Sign up
            </Link>
          </span>
        </div>
      </form>
      {errorMessage && <p className={cls.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
