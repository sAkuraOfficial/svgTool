import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    zh: {
        translation: {
            "app": {
                "title": "SVG 工具包",
                "workspace": "工作区",
                "library": "图标库",
                "manipulation": "操作面板"
            },
            "colors": {
                "red": "红色",
                "orange": "橙色",
                "amber": "琥珀色",
                "yellow": "黄色",
                "lime": "酸橙色",
                "green": "绿色",
                "emerald": "祖母绿",
                "teal": "青色",
                "cyan": "蓝绿色",
                "sky": "天蓝色",
                "blue": "蓝色",
                "indigo": "靛蓝色",
                "violet": "紫罗兰",
                "purple": "紫色",
                "fuchsia": "品红色",
                "pink": "粉红色",
                "rose": "玫瑰红",
                "slate": "板岩灰",
                "gray": "灰色",
                "zinc": "锌灰",
                "neutral": "正中性",
                "stone": "石头灰",
                "taupe": "灰褐色",
                "mauve": "淡紫色",
                "mist": "薄雾灰",
                "olive": "橄榄绿",
                "usage": {
                    "red": "错误提示、删除按钮、危险警告",
                    "orange": "警示、节日感、温暖的引导",
                    "amber": "警告、等级标识（如星星、勋章）",
                    "yellow": "关注、提醒、高亮显示",
                    "lime": "前卫、极客感、高饱和点缀",
                    "green": "成功状态、财务、环保主题",
                    "emerald": "现代感绿色、安全、健康",
                    "teal": "商务、医疗、平静的界面",
                    "cyan": "科技感、明亮的水系风格",
                    "sky": "友好、开放、背景天空色",
                    "blue": "最通用的品牌色、链接、主按钮",
                    "indigo": "现代 SaaS 界面、专业、深沉",
                    "violet": "创造力、梦幻感、品牌点缀",
                    "purple": "尊贵、艺术、女性化风格",
                    "fuchsia": "时尚、充满活力的强调色",
                    "pink": "浪漫、温和、营销视觉",
                    "rose": "柔和的警示、优雅的强调",
                    "slate": "偏蓝冷的灰色，适合冷色调 UI",
                    "gray": "标准中性灰色，最不容易出错",
                    "zinc": "偏冷，类似苹果官网的现代质感",
                    "neutral": "绝对平衡，无冷暖偏向",
                    "stone": "偏暖，适合纸张感、自然感界面",
                    "taupe": "复古、高级、大地色系",
                    "mauve": "带有灰调的优雅紫色",
                    "mist": "极浅、通透的背景色",
                    "olive": "沉稳、自然界的暗绿色"
                }
            },
            "workspace": {
                "empty": "工作区暂无 SVG",
                "upload_hint": "上传文件或从图标库中选择以开始使用",
                "browse": "浏览文件",
                "upload_btn": "上传 SVG"
            },
            "controls": {
                "target_color": "目标颜色",
                "bg_color": "背景颜色",
                "transparent_bg": "透明背景",
                "black": "浅黑",
                "white": "纯白",
                "export_size": "导出尺寸",
                "export_format": "导出格式",
                "export_all": "全部导出",
                "export_zip": "打包为 ZIP",
                "save_as": "另存为",
                "clear": "清空工作区",
                "history": "历史参数",
                "unsupported_folder_api": "当前浏览器不支持文件夹选择，请使用 ZIP 导出或更换兼容的 Chromium 浏览器。"
            },
            "library": {
                "search": "搜索图标...",
                "selected": "已选择",
                "clear": "清除",
                "add": "添加",
                "empty": "未找到匹配的图标"
            }
        }
    },
    en: {
        translation: {
            "app": {
                "title": "SVG Tool",
                "workspace": "Workspace",
                "library": "Icon Library",
                "manipulation": "Manipulation"
            },
            "workspace": {
                "empty": "No SVGs in Workspace",
                "upload_hint": "Upload files or click from the Icon Library to get started.",
                "browse": "Browse Files",
                "upload_btn": "Upload SVGs"
            },
            "controls": {
                "target_color": "Target Color",
                "bg_color": "Background Color",
                "transparent_bg": "Transparent Background",
                "black": "Black",
                "white": "White",
                "export_size": "Export Size",
                "export_format": "Export Format",
                "export_all": "Export All",
                "export_zip": "Export as ZIP",
                "save_as": "Save As...",
                "clear": "Clear Workspace",
                "history": "History",
                "unsupported_folder_api": "Your browser does not support folder selection. Please export as ZIP or use Chrome/Edge."
            },
            "library": {
                "search": "Search icons...",
                "selected": "selected",
                "clear": "Clear",
                "add": "Add",
                "empty": "No icons found"
            },
            "colors": {
                "red": "Red",
                "orange": "Orange",
                "amber": "Amber",
                "yellow": "Yellow",
                "lime": "Lime",
                "green": "Green",
                "emerald": "Emerald",
                "teal": "Teal",
                "cyan": "Cyan",
                "sky": "Sky",
                "blue": "Blue",
                "indigo": "Indigo",
                "violet": "Violet",
                "purple": "Purple",
                "fuchsia": "Fuchsia",
                "pink": "Pink",
                "rose": "Rose",
                "slate": "Slate",
                "gray": "Gray",
                "zinc": "Zinc",
                "neutral": "Neutral",
                "stone": "Stone",
                "taupe": "Taupe",
                "mauve": "Mauve",
                "mist": "Mist",
                "olive": "Olive",
                "usage": {
                    "red": "Errors, delete buttons, destructive actions",
                    "orange": "Warnings, festive elements, warm guidance",
                    "amber": "Alerts, rating badges (e.g. stars)",
                    "yellow": "Attention, reminders, highlights",
                    "lime": "Edgy, high saturation accents",
                    "green": "Success states, financial, eco themes",
                    "emerald": "Modern green, safety, health",
                    "teal": "Business, medical, calm UI",
                    "cyan": "Techy, bright water themes",
                    "sky": "Friendly, open, sky backgrounds",
                    "blue": "Universal brand color, links, primary buttons",
                    "indigo": "Modern SaaS, professional, deep",
                    "violet": "Creativity, dreamy, brand accents",
                    "purple": "Premium, artistic, feminine themes",
                    "fuchsia": "Trendy, energetic highlights",
                    "pink": "Romantic, gentle, marketing visuals",
                    "rose": "Soft alerts, elegant emphasis",
                    "slate": "Cool grayish-blue, for cool-toned UI",
                    "gray": "Standard neutral, safe choice",
                    "zinc": "Cool, modern feel (like Apple)",
                    "neutral": "Balanced neutral, no cold/warm bias",
                    "stone": "Warm neutral, paper-like UI",
                    "taupe": "Premium, earthy, retro",
                    "mauve": "Elegant purple-gray",
                    "mist": "Very light, airy backgrounds",
                    "olive": "Stable, natural dark green"
                }
            }
        }
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'zh',
        debug: false,
        interpolation: {
            escapeValue: false, // react already safes from xss
        }
    })

export default i18n
