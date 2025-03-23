export function isSafeQuery(query: string): boolean {
  if (!query || query.trim().length === 0) {
    return false
  }
  return query.trim().toLowerCase().startsWith('select')
}
