"use server";

import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

const secretKey = process.env.CRYPTOJS_SECRET_KEY as string;

export const encryptPayload = async (payload: JSON) => {
  const decodedPayload = JSON.stringify(payload);
  const encryptedPayload = AES.encrypt(decodedPayload, secretKey).toString();

  return encryptedPayload;
};

// Not JSON because we expect payload to be encrypted
export const decryptPayload = async (payload: string) => {
  const decryptedPayload = AES.decrypt(payload, secretKey);
  const encodedPayload = JSON.parse(decryptedPayload.toString(Utf8));

  return encodedPayload;
};
