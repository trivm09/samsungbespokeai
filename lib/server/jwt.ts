import { JWTPayload } from "jose";
import { SignJWT, jwtVerify } from "jose";

export interface EncryptPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Encrypt the jwt token
export async function encrypt(payload: EncryptPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Decrypt the jwt token
export async function decrypt(token: string | undefined = "") {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.error(err);
  }
}
