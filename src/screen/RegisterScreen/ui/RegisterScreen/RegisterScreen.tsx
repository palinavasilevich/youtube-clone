"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/shared/constants/routes";
import { useRegisterForm } from "@/screen/RegisterScreen/lib/useRegisterForm";
import { cn } from "@/shared/lib/css";
import cls from "./RegisterScreen.module.css";

export function RegisterScreen() {
  const { isLoading, errors, errorMessage, register, onSubmit } =
    useRegisterForm();

  const hasUsernameError = !!errors.username?.message;
  const hasPasswordError = !!errors.password?.message;
  const hasConfirmPasswordError = !!errors.confirmPassword?.message;

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
          <p className={cls.title}>Sign up</p>
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

            <label htmlFor="confirmPassword" className={cls.label}>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={cn(
                  cls.input,
                  hasConfirmPasswordError && cls.errorInput,
                )}
                {...register("confirmPassword")}
              />

              {hasConfirmPasswordError && (
                <p className={cls.inputErrorMessage}>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </label>

            {errorMessage &&
              !hasUsernameError &&
              !hasPasswordError &&
              !hasConfirmPasswordError && (
                <p className={cls.errorMessage}>{errorMessage}</p>
              )}

            <div className={cls.actions}>
              <Link href={ROUTES.LOGIN} className={cls.accountLink}>
                Already have an account?
              </Link>
              <button
                type="submit"
                className={cls.signUpButton}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
