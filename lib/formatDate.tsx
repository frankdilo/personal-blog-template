import { parseISO, format, subDays, formatDistance } from "date-fns";

export function formatDate(isoString: string, providedFormat?: string) {
  const parsed = parseISO(isoString);
  return format(parsed, providedFormat || "MMMM d, yyyy");
}

export function formatDateRelative(isoString: string): string {
  const parsed = parseISO(isoString);
  const formatted = formatDistance(parsed, new Date());
  return formatted.replace(/(about|over|almost) /, "");
}
