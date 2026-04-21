"use client";

import Link from "next/link";
import { useRegisterForm } from "@/screen/RegisterScreen/lib/useRegisterForm";
import { cn } from "@/shared/lib/css";
import cls from "./RegisterScreen.module.css";

export function RegisterScreen() {
  const { isLoading, errors, errorMessage, register, onSubmit } =
    useRegisterForm();

  const hasLoginError = !!errors.login?.message;
  const hasPasswordError = !!errors.password?.message;
  const hasConfirmPasswordError = !!errors.confirmPassword?.message;

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

        <label htmlFor="confirmPassword" className={cls.label}>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className={cn(cls.input, hasPasswordError && cls.errorInput)}
            {...register("confirmPassword")}
          />

          {hasConfirmPasswordError && (
            <p className={cls.errorMessage}>
              {errors.confirmPassword?.message}
            </p>
          )}
        </label>

        <div className={cls.actions}>
          <button
            type="submit"
            className={cls.submitButton}
            disabled={isLoading}
          >
            Sign Up
          </button>

          <span>
            Do you already have an account?{" "}
            <Link href={`/auth/login`} className={cls.createAccountLink}>
              Sign in
            </Link>
          </span>
        </div>
      </form>
      {errorMessage && <p className={cls.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
