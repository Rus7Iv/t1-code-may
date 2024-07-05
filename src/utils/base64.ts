export const encodeToBase64 = (email: string, code: string): string => {
  const stringToEncode = `${email}:${code}`
  return btoa(encodeURIComponent(stringToEncode))
}
