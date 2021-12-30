import {Base64} from 'js-base64';

export function json2Binary(json: any): string {
  return Base64.encode(JSON.stringify(json));
}

export function binary2json<T = any>(binary: string): T {
  try {
    return JSON.parse(Base64.decode(binary)) as T;
  } catch (e) {
    return null;
  }
}
