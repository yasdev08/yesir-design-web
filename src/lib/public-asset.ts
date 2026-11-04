import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/** True if /public contains the file — evaluated at build/prerender time. */
export function hasPublicAsset(src: string | undefined): src is string {
  if (!src || !src.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", src));
}
