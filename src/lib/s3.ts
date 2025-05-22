export const S3_URL_PREFIX = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/`;

import { S3 } from "@aws-sdk/client-s3";

if (!process.env.S3_BUCKET) {
  throw new Error("S3_BUCKET is not set");
}

if (!process.env.REGION) {
  throw new Error("REGION is not set");
}

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("AWS_ACCESS_KEY_ID is not set");
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_SECRET_ACCESS_KEY is not set");
}

const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// path는 타입/타입ID 순으로 입력
// ex) store/
// ex) store/:store_id/product
type S3ImageUploadReq = {
  path: string;
  image: File;
};

type S3ImageDeleteReq = {
  url: string;
};

export async function uploadImageToS3({ path, image }: S3ImageUploadReq) {
  const extension = image.name.split(".").pop();
  const fileName = `image_${new Date().getTime()}.${extension}`;
  const pathKey = `${path}/${fileName}`;
  const bufferedImage = await image.arrayBuffer();

  try {
    await s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: pathKey,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  return `${S3_URL_PREFIX}/${pathKey}`;
}

export async function deleteImageFromS3({ url }: S3ImageDeleteReq) {
  const pathKey = url.split(S3_URL_PREFIX)[0];

  try {
    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: pathKey,
    });
  } catch (error) {
    console.error("S3 삭제 에러:", error);
    throw error;
  }
}
