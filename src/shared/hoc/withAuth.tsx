import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { AuthUser, GetUserResponse } from "../types/api.types";

type WithAuthProps = {
  user?: AuthUser;
};

export default function withAuth<T extends WithAuthProps>(
  Component: React.ComponentType<T>,
) {
  const ComponentWithAuth = async (props: Omit<T, keyof WithAuthProps>) => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(AUTH_COOKIE_NAME);

    if (!authToken) {
      return <Component {...(props as T)} />;
    }

    try {
      const response = await fetch(`${process.env.SERVER_API_URL}/api/users`, {
        method: "GET",
        headers: {
          cookie: `${AUTH_COOKIE_NAME}=${authToken.value}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Auth request failed: ${response.status}`);
      }

      const data: GetUserResponse = await response.json();

      if (!data.ok) {
        throw new Error(data.message);
      }

      return <Component user={data.user} {...(props as T)} />;
    } catch (error) {
      console.error(error);
      return <Component {...(props as T)} />;
    }
  };

  ComponentWithAuth.displayName = `withAuth(${Component.displayName ?? Component.name})`;

  return ComponentWithAuth;
}
