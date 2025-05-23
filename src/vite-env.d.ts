/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string

  readonly VITE_USER_TOKEN: string,
  readonly VITE_LOGIN_URL: string
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}
