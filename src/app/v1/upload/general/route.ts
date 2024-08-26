import { createRouteHandler } from "uploadthing/next";
import { createUploadthing, type FileRouter } from "uploadthing/server";

const uploadthing = createUploadthing();

export const { GET, POST } = createRouteHandler({
  router: {
    general: uploadthing({
      image: {
        maxFileSize: "4MB",
        maxFileCount: 5,
      },
    }).onUploadError((err) => {
      console.error("Upload error!", err);
    }).onUploadComplete((data) => {
      console.log("Upload completed!", data);
    }),
  } satisfies FileRouter,
});