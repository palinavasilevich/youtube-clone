import { del, get, list, put } from "@vercel/blob";

type UserId = string;
type UserInfo = { id: UserId; username: string; password: string };

const USERS_BLOB_PREFIX = "db/users";

async function getLatestBlobKey(prefix: string): Promise<string | null> {
  const { blobs } = await list({ prefix });

  if (blobs.length === 0) return null;

  const sortedBlobs = blobs.sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  );

  return sortedBlobs[0].pathname;
}

async function getLatestUsersKey(): Promise<string | null> {
  return getLatestBlobKey(USERS_BLOB_PREFIX);
}

export async function getUsersData(): Promise<Map<UserId, UserInfo>> {
  try {
    const latestKey = await getLatestUsersKey();

    if (!latestKey) {
      return new Map();
    }

    const result = await get(latestKey, { access: "private" });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return new Map();
    }

    const data = await new Response(result.stream).json();
    return new Map(Object.entries(data));
  } catch (e) {
    console.error("getUsersData error:", e);
    return new Map();
  }
}

export async function saveUsers(users: Map<UserId, UserInfo>): Promise<void> {
  const currentUsers = await getUsersData();
  const mergedUsers = new Map([...currentUsers, ...users]);
  const data = Object.fromEntries(mergedUsers);

  try {
    const { blobs } = await list({ prefix: USERS_BLOB_PREFIX });
    for (const blob of blobs) {
      await del(blob.url);
    }
  } catch (e) {
    console.error("Error deleting old user versions:", e);
  }

  const timestamp = Date.now();
  const newKey = `${USERS_BLOB_PREFIX}-${timestamp}.json`;

  await put(newKey, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}
