const I18n = 
`import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookie from "js-cookie"; 

// TODO: i18配置：https://www.i18next.com/overview/configuration-options
i18n 
    .use(initReactI18next) 
    .init({
        resources: {
            EN: { translations: require("./locale/en.json"), },
            CN: { translations: require("./locale/zh.json"), },
        },
        // fallbackLng: 'zh-CN', // 使用LanguageDetector 取消注释
        fallbackLng: Cookie.get("lang") === "EN" ? "EN" : "CN",
        debug: false,
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true,
        },
    });
`
export default I18n;