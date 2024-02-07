import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import tr from "./tr.json"
import en from "./en.json"


export const languageResources = {
    tr: { translation: tr },
    en: { translation: en }
}


i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "tr",
    fallbackLng: "tr",
    resources: languageResources
})

export default i18next