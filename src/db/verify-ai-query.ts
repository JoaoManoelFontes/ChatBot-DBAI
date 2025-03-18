export function isSafeQuery(query: string): boolean {
  if (!query || query.trim().length === 0) {
    return false;
  }

  const forbiddenQueryKeywords = [
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "ALTER",
    "CREATE",
    "TRUNCATE",
  ];

  for (const keyword of forbiddenQueryKeywords) {
    if (new RegExp(`\\b${keyword}\\b`, "i").test(query)) {
      return false;
    }
  }

  return query.trim().toLowerCase().startsWith("select");
}
