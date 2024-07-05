export const encodeToBase64 = (email: string, code: string) => {
  const data = `${email}:${code}`
  return btoa(data)
}
