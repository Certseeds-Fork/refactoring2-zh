// SPDX-FileCopyrightText: 2025-2025 Certseeds
// SPDX-License-Identifier: MIT
import { defineConfig } from 'vitepress'

const hostURL = 'https://certseeds-fork.github.io/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/refactoring2-zh/',
    srcDir: './docs',
    title: "《重构 改善既有代码的设计》",
    description: "《重构 改善既有代码的设计》在线阅读",
    srcExclude: [
        "LICENSE"
    ],
    themeConfig: {
        sidebar: [
            {
                text: '元数据',
                items: [
                    { text: "封面", link: "REAMDE" }
                    , { text: "第 2 章 重构的原则", link: "ch2" }
                    , { text: "第 3 章 代码的坏味道", link: "ch3" }
                    , { text: "第 4 章 构筑测试体系", link: "ch4" }
                    , { text: "第 5 章 介绍重构名录", link: "ch5" }
                    , { text: "第 6 章 第一组重构", link: "ch6" }
                    , { text: "第 7 章 封装", link: "ch7" }
                    , { text: "第 8 章 搬移特性", link: "ch8" }
                    , { text: "第 9 章 重新组织数据", link: "ch9" }
                    , { text: "第 10 章 简化条件逻辑", link: "ch10" }
                    , { text: "第 11 章 重构 API", link: "ch11" }
                    , { text: "第 12 章 处理继承关系", link: "ch12" }
                    ,
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Certseeds-Fork' }
        ],
        lastUpdated: {
            formatOptions: {
                era: "short",
                year: "numeric",
                month: "long",
                weekday: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
                timeZone: "UTC",
                timeZoneName: "longGeneric",
                fractionalSecondDigits: 3,
                formatMatcher: "basic",
            },
        },
    },
    head: [
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'zh-CN' }],
        ['meta', { property: 'og:title', content: '《重构 改善既有代码的设计》' }],
        ['meta', { property: 'og:site_name', content: '重构 改善既有代码的设计 第二版中文版' }],
        ['meta', { property: 'og:url', content: `${hostURL}` }],
        ['meta', { property: 'twitter:title', content: '重构 改善既有代码的设计 第二版中文版' }],
        ['meta', { property: 'twitter:description', content: '重构 改善既有代码的设计 第二版中文版' }],
        ['meta', { property: 'keywords', content: 'vitepress, book, zh-cn, translate' }],
        ['meta', { property: 'robots', content: 'index, follow' }],
        ['meta', { property: 'copyleft', content: 'MIT' }],
        ['meta', { name: 'license', content: 'MIT' }],
        ['link', { rel: 'license', href: "https://spdx.org/licenses/MIT.html" }],

    ],
    sitemap: {
        hostname: hostURL
    },
    lastUpdated: true,
    metaChunk: true
})
