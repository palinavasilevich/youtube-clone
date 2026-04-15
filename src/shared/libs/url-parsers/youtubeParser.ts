const YT_ID = /^[A-Za-z0-9_-]{11}$/;
// /shorts/{id}[...]
const RE_YT_SHORTS_PATH = /^\/shorts\/([A-Za-z0-9_-]{11})(?:[/?]|$)/;
// /embed/{id}[...]
const RE_YT_EMBED_PATH = /^\/embed\/([A-Za-z0-9_-]{11})(?:[/?]|$)/;

export const parseYouTube = (u: URL): string | null => {
  if (u.hostname.toLowerCase().replace(/^www\./, "") === "youtu.be") {
    // youtu.be/<id>
    const id = u.pathname.slice(1).split("/")[0];
    return YT_ID.test(id) ? id : null;
  }

  // /watch?v=<id>
  if (u.pathname === "/watch") {
    const id = u.searchParams.get("v") ?? "";
    return YT_ID.test(id) ? id : null;
  }

  // /shorts/<id>[...]
  const shorts = RE_YT_SHORTS_PATH.exec(u.pathname);
  if (shorts) return shorts[1];

  // /embed/<id>[...]
  const embed = RE_YT_EMBED_PATH.exec(u.pathname);
  if (embed) return embed[1];

  return null;
};
