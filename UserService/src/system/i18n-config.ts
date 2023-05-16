import i18n from "i18n";

i18n.configure({
  locales: ["en", "fr"],
  defaultLocale: "en",
  queryParameter: "lang",
  directory: './src/assets/i18n-data',
  register: global,
  objectNotation: true,
  api: {
    __: "translate",

    __n: "translateN",
  },
});

export default i18n;