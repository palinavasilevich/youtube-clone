export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  PROFILE: "/profile/[profileId]",
  VIDEO: "/video/[videoId]",
  CATEGORY: "/[categoryId]",
  ADD_VIDEO: "/editor/addVideo",
  MY_VIDEOS: "/myVideos",
} as const;

type RouteValues = (typeof ROUTES)[keyof typeof ROUTES];

type PathParams = {
  [ROUTES.PROFILE]: { profileId: string };
  [ROUTES.VIDEO]: { videoId: string };
  [ROUTES.CATEGORY]: { categoryId: string };
};

type RoutesWithParams = keyof PathParams;
type RoutesWithoutParams = Exclude<RouteValues, RoutesWithParams>;

export function buildRoute(route: RoutesWithoutParams): string;
export function buildRoute<R extends RoutesWithParams>(route: R, params: PathParams[R]): string;
export function buildRoute(route: string, params?: Record<string, string>): string {
  if (!params) return route;
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`[${key}]`, value),
    route
  );
}
