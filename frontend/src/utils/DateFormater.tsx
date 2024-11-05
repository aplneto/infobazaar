export function formatDate(date_string: string) {
  let date = new Date(date_string);
  return `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
}
