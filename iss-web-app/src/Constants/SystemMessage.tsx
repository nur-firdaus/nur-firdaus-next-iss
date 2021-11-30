import { message } from "antd"
import { createIntl, createIntlCache } from "react-intl"
import languageObject from "../Translations/index"

// Types
import { TSystemMessage } from "../Types/AppType"

const userLang: string = navigator.language
const cache = createIntlCache()

export const durationShort: number = 3;
export const durationLong: number = 10; 

const intl = createIntl(
  { locale: userLang, messages: languageObject[userLang] },
  cache
)

export const SystemMessage: TSystemMessage = {
  operationSuccess: (response, duration = 1.5) => {
    message.success(
      intl.formatMessage({ id: response }, { lang: userLang }),
      duration
    )
  },
  operationError: (response, duration = 1.5) => {
    message.error(
      intl.formatMessage({ id: response }, { lang: userLang }),
      duration
    )
  },
}
