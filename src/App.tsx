import React, { useEffect } from "react";
import { theme, ConfigProvider, App as AppProvider } from "antd";
import { RootState, useSelector, useDispatch } from "@/redux"; // redux
import { setGlobalState } from "@/redux/modules/global"; // 设置Global属性 redux
import { LanguageType } from "@/redux/interface"; // 语言类型 枚举 enum
import { shallowEqual } from "react-redux";
import { getBrowserLang } from "@/utils"; // 获取浏览器默认语言
import { I18nextProvider } from "react-i18next";
import { RefreshProvider } from "@/context/Refresh";
import ErrorBoundary from "@/hooks/useErrorBoundary";
import RouterProvider from "@/routers"; // 路由 router

import i18n from "@/languages/index"; // 国际化 i18n
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs"; // declare namespace dayjs {}
import "dayjs/locale/zh-cn"; // declare module 'dayjs/locale/*' {}

// todo
// todo 设置主题：是否暗黑模式 && 是否紧凑主题
// todo 设置语言：获取浏览器语言 && 同步redux语言 && 设置i18n语言 && 设置dayjs语言
// todo 设置包裹路由： <RouterProvider />
const App: React.FC = () => {
  const dispatch = useDispatch();

  const { isDark, primary, componentSize, compactAlgorithm, borderRadius, language } = useSelector((state: RootState) => {
    const { isDark, primary, componentSize, compactAlgorithm, borderRadius, language } = state.global;
    return { isDark, primary, componentSize, compactAlgorithm, borderRadius, language };
  }, shallowEqual);

  // init theme algorithm     (添加黑暗模式 / 紧凑模式)
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm];
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm);
    // console.log("isDark", isDark);
    // console.log("algorithmArr", algorithmArr);
    return algorithmArr;
  };

  // init language     (初始语言：redux，i18n，dayjs)
  const initLanguage = () => {
    const result = language ?? getBrowserLang();
    dispatch(setGlobalState({ key: "language", value: result as LanguageType }));
    i18n.changeLanguage(language as string);
    dayjs.locale(language === "zh" ? "zh-cn" : "en");
  };
  useEffect(() => {
    initLanguage();
  }, [language]);

  const configProviderProps = {
    locale: language === "zh" ? zhCN : enUS, // 配置国际化：https://ant.design/docs/react/i18n-cn#configprovider
    componentSize: componentSize,
    autoInsertSpaceInButton: true,
    theme: {
      token: { colorPrimary: primary, borderRadius }, // 全局配置字体：fontFamily: "aliFonts"
      algorithm: algorithm()
    }
  };
  return (
    // antd Global Config：  https://ant.design/docs/react/customize-theme-cn#seedtoken
    <ConfigProvider {...configProviderProps}>
      <AppProvider>
        <I18nextProvider i18n={i18n}>
          {/* 全局刷新 / 局部刷新数据  */}
          <RefreshProvider>
            <ErrorBoundary>
              <RouterProvider />
            </ErrorBoundary>
          </RefreshProvider>
        </I18nextProvider>
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;
