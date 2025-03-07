[English](README.md) | 中文
# 卓越银行 (The Amazing Bank) - 前端应用
## 业务背景
卓越银行是一个现代化银行平台，旨在为个人和企业客户提供无缝的在线银行体验。我们的使命是让银行业务变得简单、安全且人人可及。
## 技术概要
该项目是一个基于React的前端应用，使用以下技术构建：
- React 18
- TypeScript
- Tailwind CSS
- Vite构建工具
- React Router导航
- i18next国际化
## 组件
应用由几个关键组件组成：
- **Header**: 包含银行标志和主导航
- **Footer**: 包含版权和法律信息
- **Home**: 主登陆页面
- **InterestCalculator**: 计算利率的工具
## 功能
- 适应所有设备的响应式设计
- 平滑的动画和过渡效果
- 网上银行门户访问
- 个人和企业银行业务部分
- 利率计算器
- 多语言支持（英文/中文）

## 国际化

应用支持多种语言，可以轻松切换：

- 导航头部的语言选择按钮
- 翻译存储在独立的资源文件中（`/public/locales/[lang]/translation.json`）
- 自动检测并记住用户的语言偏好
- 切换语言时的平滑过渡

### 主要国际化功能

1. **语言检测**：自动从浏览器设置、URL参数或之前的访问记录中检测用户的首选语言。

2. **语言上下文**：用于语言信息和状态管理的全局React上下文。

3. **翻译加载**：异步加载翻译文件，并显示加载指示器。

4. **富文本支持**：支持在翻译中使用HTML格式化，满足高级格式化需求。

5. **可扩展系统**：支持在不更改代码的情况下添加其他语言。

6. **持久化偏好**：在多次访问之间记住用户的语言偏好。

### 项目结构

```
src/
  i18n.ts                   # i18n配置
  contexts/
    LanguageContext.tsx     # 语言状态管理
  components/
    LanguageIndicator.tsx   # 显示当前语言
    LanguageSelector.tsx    # 语言选择下拉菜单
    LanguageTransition.tsx  # 语言切换时的加载覆盖层
  utils/
    languageDetector.ts     # 自定义语言检测
    supportedLanguages.ts   # 语言定义
public/
  locales/
    en/
      translation.json      # 英文翻译
    zh/
      translation.json      # 中文翻译
```

### 添加新翻译

为组件添加翻译：

1. 将翻译键和值添加到 `/public/locales/en/translation.json` 和 `/public/locales/zh/translation.json`
2. 在组件中使用 `useTranslation` hook 访问翻译：
   ```jsx
   const { t } = useTranslation();
   return <div>{t('your.translation.key')}</div>;
   ```

### 翻译中的HTML格式化

对于需要HTML格式化的富文本内容：

1. 在翻译文件中定义带有HTML标签的翻译：
   ```json
   {
     "welcome": "欢迎来到<bold>卓越银行</bold>"
   }
   ```

2. 使用 `formatHtml` 辅助函数：
   ```jsx
   const { formatHtml } = useLanguage();
   return <div>{formatHtml('welcome', {
     bold: <span className="font-bold" />
   })}</div>;
   ```

### 支持其他语言

添加新语言：

1. 在 `/public/locales/[语言代码]/translation.json` 创建新的翻译文件
2. 在 `src/utils/supportedLanguages.ts` 中添加语言定义
3. 该语言将自动出现在语言选择器中

## 贡献
我们欢迎对此项目的贡献！请遵循以下指南：
1. Fork仓库
2. 为您的功能创建新分支
3. 提交带有详细更改说明的拉取请求
## 开始使用
1. 克隆仓库
2. 安装依赖: `npm install`
3. 运行开发服务器: `npm run dev`
4. 构建生产版本: `npm run build`
## 许可证
MIT许可证 - 详情参见 [LICENSE](LICENSE) 文件
