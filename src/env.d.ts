interface ImportMetaEnv {
  readonly PUBLIC_SITE_ENV?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_SHOW_DEMO?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
