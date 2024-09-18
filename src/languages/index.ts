import i18n from 'i18next'
import enUsTrans from './modules/en'
import zhCnTrans from './modules/zh'
import { getBrowserLang } from '@/utils'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enUsTrans,
		},
		zh: {
			translation: zhCnTrans,
		},
	},
	lng: getBrowserLang(),
	debug: false,
	// debug: process.env.NODE_ENV !== 'production', // 开启调试模式
	interpolation: {
		escapeValue: false, // 不转义特殊字符
	},
})
export default i18n

// ! 使用
// import { useTranslation, Trans } from 'react-i18next'
// const { t, i18n } = useTranslation()
// <span>{t("tabs.refresh")}</span>

// ! 切换语言功能
// renderI18n = item => {
//   const { i18n } = this.props;
//   return (
//     <Button onclick={() => i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")}>
//       {i18n.language === "en" ? "切换成中文": "切换成英文"}
//     </Button>
//   )
// }
