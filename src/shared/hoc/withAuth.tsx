import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { AuthUser } from "../types/api.types";
import { getUsers } from "@/app/api/users/getUsers";

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
      const data = await getUsers();

      if (!data.ok) {
        throw new Error(`Auth request failed`);
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
