import { redis } from "@/lib/clients";
import { Link, LinkRecord, LinkStatsRecord } from "@/lib/types";

export async function setLink(id: string, record: LinkRecord) {
  try {
    await redis.set<LinkRecord>(`go:${id}`, record);
    return getLink(id);
  } catch (error) {
    return undefined;
  }
}

export async function getLink(id: string) {
  try {
    const redirect = await redis.get<LinkRecord>(`go:${id}`);
    if (!redirect) {
      return undefined;
    }
    return {
      id,
      ...redirect,
    } as Link;
  } catch (error) {
    return undefined;
  }
}

export async function getLinkStats(id: string) {
  try {
    const clicks = await redis.get<number>(`go-stats:${id}:clicks`);
    return {
      id,
      clicks: clicks || 0,
    } as LinkStatsRecord;
  } catch (error) {
    return undefined;
  }
}

export async function getLinks() {
  try {
    const keys = await redis.keys("go:*");
    const redirects = await redis.mget<LinkRecord[]>(keys);
    const records = redirects.map((redirect, index) => ({
      id: keys[index].replace("go:", ""),
      ...redirect,
    })) as Link[];
    return records;
  } catch (error) {
    return [];
  }
}

export async function deleteLink(id: string) {
  try {
    await redis.del(`go:${id}`);
    return true;
  } catch (error) {
    return false;
  }
}