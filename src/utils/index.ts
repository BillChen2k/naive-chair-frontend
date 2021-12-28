export function json2Binary(json: any): string {
  return btoa(JSON.stringify(json));
}

export function binary2json<T = any>(binary: string): T {
  try {
    return JSON.parse(atob(binary));
  } catch (e) {
    return null;
  }
}
