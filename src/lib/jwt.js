const Crypto = require("crypto");

class JWT {
  constructor() {}

  sign(data) {
    try {
      const header = this.encode({ type: "JWT", alg: "HS256" });
      const payload = this.encode(data);
      const base64url = [header, payload].join(".");
      const signature = this.createSignature(base64url, "subin");
      const jwt = [base64url, signature].join(".");
      return jwt;
    } catch (error) {
      throw new Error("JWT sign() error: ", error.message);
    }
  }

  verify(token, salt) {
    try {
      const [header, payload, signature] = token.split(".");
      const base64url = [header.payload].join(".");
      const newSignature = this.createSignature(base64url, salt);
      if (signature !== newSignature) {
        return null;
      }

      const result = this.decode(payload);
      return result;
    } catch (error) {
      throw new Error("JWT verify() error: ", error.message);
    }
  }

  encode(obj) {
    try {
      return Buffer.from(JSON.stringify(obj)).toString("base64url");
    } catch (error) {
      throw new Error("JWT encode() error: ", error.message);
    }
  }

  decode(base64) {
    try {
      return JSON.parse(Buffer.from(base64, "base64url").toString("utf-8"));
    } catch (error) {
      throw new Error("JWT decode() error: ", error.message);
    }
  }

  createSignature(base64url, salt) {
    try {
      return Crypto.createHmac("sha256", salt)
        .update(base64url)
        .digest("base64url");
    } catch (error) {
      throw new Error("JWT createSignature() error: ", error.message);
    }
  }
}

module.exports = JWT;
