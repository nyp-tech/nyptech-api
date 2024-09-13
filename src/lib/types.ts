import { z } from "zod";

export const LinkRecordSchema = z.object({
  url: z.string(),
  description: z.string(),
});

export const LinkSchema = z
  .object({
    id: z.string(),
  })
  .merge(LinkRecordSchema);

export const LinkStatsRecordSchema = z.object({
  clicks: z.number(),
});

export const LinkStatsSchema = z
  .object({
    id: z.string(),
  })
  .merge(LinkStatsRecordSchema);

export type Link = z.infer<typeof LinkSchema>;
export type LinkRecord = z.infer<typeof LinkRecordSchema>;
export type LinkStatsRecord = z.infer<typeof LinkStatsRecordSchema>;