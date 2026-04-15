export const YOUTUBE_DOMAINS = [
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
];

export const isAllowedHost = (host: string, allow: string[]) => {
  const h = host.toLowerCase().replace(/^www\./, "");
  return allow.some((d) => h === d.toLowerCase().replace(/^www\./, ""));
};
