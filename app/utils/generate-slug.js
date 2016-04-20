export function generateSlug(value) {
  return value.trim().replace(/\W+/g, '-').toLowerCase();
}
