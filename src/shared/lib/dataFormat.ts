export const viewsFormat = (views: number): string => {
  if (views >= 1_000_000)
    return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (views >= 1_000)
    return `${(views / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(views);
};

export const dateFormat = ({
  date,
  format = "relative",
}: {
  date: string;
  format?: "relative" | "full";
}): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  if (format === "relative") {
    const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
    const intervals: [number, string][] = [
      [31536000, "year"],
      [2592000, "month"],
      [604800, "week"],
      [86400, "day"],
      [3600, "hour"],
      [60, "minute"],
    ];

    for (const [secs, label] of intervals) {
      const count = Math.floor(seconds / secs);
      if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }

    return "just now";
  }

  if (format === "full") {
    return Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  }

  return "";
};
