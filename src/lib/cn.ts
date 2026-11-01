/** Minimal className joiner (avoids a dependency for a one-liner). */
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
