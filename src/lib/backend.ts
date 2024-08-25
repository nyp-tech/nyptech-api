import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "@/environment";
import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";

// Database Clients

export const prisma = new PrismaClient();
export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

// Database Types

export type Redirect = RedirectRecord & {
  id: string;
};

export type RedirectRecord = {
  url: string;
  description: string;
};