import { prisma, Redirect, RedirectRecord, redis } from "@/lib/backend";
import { Prisma } from "@prisma/client";

export async function createEvent(event: Prisma.eventCreateInput) {
  return await prisma.event.create({
    data: event,
  });
}

export async function getEvent(id: string) {
  return await prisma.event.findUnique({
    where: {
      id,
    },
  });
}

export async function getEvents() {
  return await prisma.event.findMany();
}

export async function updateEvent(id: string, event: Prisma.eventUpdateInput) {
  return await prisma.event.update({
    where: {
      id,
    },
    data: event,
  });
}

export async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: {
      id,
    },
  });
}

export async function createNextEvent(event: Prisma.EventsCreateInput) {
  return await prisma.events.create({
    data: event,
  });
}

export async function getNextEvent(id: string) {
  return await prisma.events.findUnique({
    where: {
      id,
    },
  });
}

export async function getNextEvents() {
  return await prisma.events.findMany();
}

export async function updateNextEvent(id: string, event: Prisma.EventsUpdateInput) {
  return await prisma.events.update({
    where: {
      id,
    },
    data: event,
  });
}

export async function deleteNextEvent(id: string) {
  return await prisma.events.delete({
    where: {
      id,
    },
  });
}

export async function getFeature(id: string) {
  return await prisma.feature.findUnique({
    where: {
      id,
    },
  });
}

export async function createFeature(feature: Prisma.FeatureCreateInput) {
  return await prisma.feature.create({
    data: feature,
  });
}

export async function getFeatures() {
  return await prisma.feature.findMany();
}

export async function updateFeature(id: string, feature: Prisma.FeatureUpdateInput) {
  return await prisma.feature.update({
    where: {
      id,
    },
    data: feature,
  });
}

export async function deleteFeature(id: string) {
  return await prisma.feature.delete({
    where: {
      id,
    },
  });
}

export async function setLink(id: string, record: RedirectRecord) {
  try {
    await redis.set<RedirectRecord>(`go:${id}`, record);
    return getLink(id);
  } catch (error) {
    return undefined;
  }
}

export async function getLink(id: string) {
  try {
    const redirect = await redis.get<RedirectRecord>(`go:${id}`);
    if (!redirect) {
      return undefined;
    }
    return {
      id,
      ...redirect,
    } as Redirect;
  } catch (error) {
    return undefined;
  }
}

export async function getLinks() {
  try {
    const keys = await redis.keys("go:*");
    const redirects = await redis.mget<RedirectRecord[]>(keys);
    const records = redirects.map((redirect, index) => ({
      id: keys[index].replace("go:", ""),
      ...redirect,
    })) as Redirect[];
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