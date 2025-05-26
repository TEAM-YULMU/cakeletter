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
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// path는 타입/타입ID 순으로 입력
// ex) store/
// ex) store/:store_id/product
type S3FileImageUploadReq = {
  path: string;
  image: File;
};

type S3Base64ImageUploadReq = {
  path: string;
  imageData: string;
};

type S3ImageDeleteReq = {
  url: string;
};

export async function uploadFileImageToS3({ path, image }: S3FileImageUploadReq) {
  const extension = image.name.split(".").pop();
  const fileName = `image_${Date.now()}_${Math.floor(Math.random() * 100000)}.${extension}`;
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

  return `${S3_URL_PREFIX}${pathKey}`;
}

export async function uploadBase64ImageToS3({ path, imageData }: S3Base64ImageUploadReq) {
  const extension = "png";
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const fileName = `image_${Date.now()}_${Math.floor(Math.random() * 100000)}.${extension}`;
  const pathKey = `${path}/${fileName}`;

  try {
    await s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: pathKey,
      Body: Buffer.from(buffer),
      ContentEncoding: "base64", // 중요
      ContentType: "image/png", // 예: "image/png"
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  return `${S3_URL_PREFIX}${pathKey}`;
}

export async function deleteImageFromS3({ url }: S3ImageDeleteReq) {
  const pathKey = url.replace(S3_URL_PREFIX, "");

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
