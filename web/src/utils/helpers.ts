const AUTH_TOKEN_KEY = 'authToken'

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY) ?? null
}

export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}
