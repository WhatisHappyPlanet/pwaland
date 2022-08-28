export async function request(url) {
  const response = await fetch(url);
  return await response.json();
}

export function parseJson(str) {
  try {
    return JSON.parse(str)
  } catch {
    return {};
  }
}