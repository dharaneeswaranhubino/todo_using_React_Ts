import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const ENV = {
  DB_HOST: required("DB_HOST"),
  DB_PORT: Number(required("DB_PORT")),
  DB_USER: required("DB_USER"),
  DB_PASS_KEY: required("DB_PASS_KEY"),
  DB_NAME: required("DB_NAME"),
};