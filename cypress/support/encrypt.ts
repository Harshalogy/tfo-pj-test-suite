import hkdf from "futoin-hkdf"
import { JWE, JWK } from "jose"

const BYTE_LENGTH = 32
const ENCRYPTION_INFO = "JWE CEK"
const options = { hash: "SHA-256" }

/**
 *
 * Derives appropriate sized keys from the end-user provided secret random string/passphrase using
 * HKDF (HMAC-based Extract-and-Expand Key Derivation Function) defined in RFC 8569
 *
 * @see https://tools.ietf.org/html/rfc5869
 *
 */
const deriveKey = (secret: string) =>
  hkdf(secret, BYTE_LENGTH, { info: ENCRYPTION_INFO, ...options })

export default function encrypt(
  arg: { secret: string } & Record<string, unknown>,
): Promise<string> {
  const { secret, ...thingToEncrypt } = arg
  const key = JWK.asKey(deriveKey(secret))
  const epochNow = (Date.now() / 1000) | 0

  return Promise.resolve(
    JWE.encrypt(JSON.stringify(thingToEncrypt), key, {
      alg: "dir",
      enc: "A256GCM",
      uat: epochNow,
      iat: epochNow,
      exp: epochNow + 7 * 24 * 60 * 60,
    }),
  )
}
