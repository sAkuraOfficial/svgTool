import { useState, useRef, type ChangeEvent, useDeferredValue, useEffect } from "react"
import { Upload, Download, Palette, Trash2, X, LayoutGrid, Clock, ChevronDown, Archive, FolderOutput } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IconLibrary } from "./icon-library"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define complete Tailwind standard palettes
const TAILWIND_COLORS: Record<string, string[]> = {
    red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
    orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'],
    amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
    yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12'],
    lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314'],
    green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
    teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'],
    cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
    sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
    blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
    indigo: ['#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#312e81'],
    violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
    purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87'],
    fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75'],
    pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843'],
    rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337'],
    slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'],
    gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827'],
    zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b'],
    neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717'],
    stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917'],
    taupe: ['#fbfbfb', '#f5f5f4', '#e6e4e3', '#d5d1cf', '#a69f9c', '#756e6b', '#544f4d', '#3e3a38', '#252322', '#1a1817'],
    mauve: ['#fcfbfe', '#f4f2f9', '#e6e2ef', '#d3cce0', '#a49bb3', '#726980', '#51495c', '#3c3645', '#242029', '#19161d'],
    mist: ['#f9fafb', '#f1f3f5', '#e1e5e8', '#cad1d7', '#93a1ac', '#62717e', '#45515b', '#323c44', '#1d2328', '#14181c'],
    olive: ['#fafaf9', '#f3f4f1', '#e4e6df', '#ced2c6', '#9ba190', '#69705e', '#4b5243', '#373d30', '#21251c', '#171a13'],
}
export interface SvgItem {
    id: string
    name: string
    content: string
}

type ExportFormat = "png" | "svg" | "jpeg" | "webp"

interface ExportHistoryItem {
    color: string
    bgColor: string
    isBgTransparent: boolean
    size: number
    format: ExportFormat
    timestamp: number
}

const HISTORY_KEY = "svg-export-history"

export function SvgWorkspace() {
    const { t } = useTranslation()
    const [svgs, setSvgs] = useState<SvgItem[]>([])

    // Screen State
    const [activeTab, setActiveTab] = useState("workspace")

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && activeTab === "controls") {
                setActiveTab("workspace")
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [activeTab])

    // Real-time states for controls
    const [color, setColor] = useState<string>("#000000")
    const [bgColor, setBgColor] = useState<string>("#ffffff")
    const [isBgTransparent, setIsBgTransparent] = useState<boolean>(true)
    const [exportSize, setExportSize] = useState<number>(256)
    const [format, setFormat] = useState<ExportFormat>("png")
    const [history, setHistory] = useState<ExportHistoryItem[]>([])

    // Deferred states for expensive rendering
    const deferredColor = useDeferredValue(color)
    const deferredBgColor = useDeferredValue(bgColor)
    const deferredIsBgTransparent = useDeferredValue(isBgTransparent)
    const deferredExportSize = useDeferredValue(exportSize)

    const fileInputRef = useRef<HTMLInputElement>(null)

    // Load history on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(HISTORY_KEY)
            if (stored) {
                setHistory(JSON.parse(stored))
            }
        } catch (e) {
            console.error("Failed to parse history", e)
        }
    }, [])

    const saveToHistory = (c: string, bgC: string, isBgT: boolean, s: number, f: ExportFormat) => {
        setHistory(prev => {
            // Create new item
            const newItem: ExportHistoryItem = { color: c, bgColor: bgC, isBgTransparent: isBgT, size: s, format: f, timestamp: Date.now() }
            // Filter out duplicate configs (exact match of color, size, format, bg settings)
            const filtered = prev.filter(item => !(item.color === c && item.bgColor === bgC && item.isBgTransparent === isBgT && item.size === s && item.format === f))
            // Add to front, keep max 10
            const updated = [newItem, ...filtered].slice(0, 10)
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const applyHistory = (item: ExportHistoryItem) => {
        setColor(item.color)
        setBgColor(item.bgColor || "#ffffff")
        setIsBgTransparent(item.isBgTransparent ?? true)
        setExportSize(item.size)
        setFormat(item.format)
        // Move to top when selected
        saveToHistory(item.color, item.bgColor || "#ffffff", item.isBgTransparent ?? true, item.size, item.format)
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        Array.from(files).forEach((file) => {
            if (file.type !== "image/svg+xml") return

            const reader = new FileReader()
            reader.onload = (event) => {
                const content = event.target?.result as string
                if (content) {
                    setSvgs((prev) => [
                        ...prev,
                        {
                            id: Math.random().toString(36).substring(7),
                            name: file.name,
                            content,
                        },
                    ])
                }
            }
            reader.readAsText(file)
        })

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const removeSvg = (id: string) => {
        setSvgs(svgs.filter((svg) => svg.id !== id))
    }

    const removeSvgByName = (iconName: string) => {
        setSvgs(svgs.filter((svg) => svg.name !== `${iconName}.svg`))
    }

    const clearAll = () => setSvgs([])

    const handleAddIcons = (selectedIcons: { name: string; content: string }[]) => {
        const newSvgs = selectedIcons.map(icon => ({
            id: Math.random().toString(36).substring(7),
            name: icon.name,
            content: icon.content,
        }))
        setSvgs(prev => [...prev, ...newSvgs])
    }

    const getColoredSvg = (originalContent: string, targetColor: string) => {
        let colored = originalContent.replace(
            /(fill|stroke)="(?!(?:none|transparent))[^"]+"/gi,
            `$1="${targetColor}"`
        )
        colored = colored.replace(/currentColor/gi, targetColor)
        return colored
    }

    const downloadFile = (dataUrl: string, name: string, ext: string) => {
        const a = document.createElement("a")
        a.href = dataUrl
        a.download = `${name}.${ext}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const downloadSvgAs = (svgItem: SvgItem) => {
        const coloredContent = getColoredSvg(svgItem.content, color)
        const baseName = svgItem.name.replace(".svg", "")

        // Prepare SVG content with background if needed
        let finalSvgContent = coloredContent
        if (!isBgTransparent) {
            finalSvgContent = coloredContent.replace(
                /(<svg[^>]*>)/i,
                `$1<rect width="100%" height="100%" fill="${bgColor}" />`
            )
        }

        // Export natively as SVG
        if (format === "svg") {
            const svgBlob = new Blob([finalSvgContent], { type: "image/svg+xml;charset=utf-8" })
            const url = URL.createObjectURL(svgBlob)
            downloadFile(url, `${baseName}-colored`, "svg")
            URL.revokeObjectURL(url)
            return
        }

        // Export rasterized (png, jpeg, webp)
        const img = new Image()
        const svgBlob = new Blob([finalSvgContent], { type: "image/svg+xml;charset=utf-8" })
        const url = URL.createObjectURL(svgBlob)

        img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = exportSize
            canvas.height = exportSize
            const ctx = canvas.getContext("2d")

            if (ctx) {
                // SVG to Canvas drawing, handling transparent backgrounds appropriately if jpeg
                if (format === "jpeg" || !isBgTransparent) {
                    ctx.fillStyle = !isBgTransparent ? bgColor : "#ffffff"
                    ctx.fillRect(0, 0, exportSize, exportSize)
                }

                ctx.drawImage(img, 0, 0, exportSize, exportSize)
                const mimeType = `image/${format}`
                const dataUrl = canvas.toDataURL(mimeType)

                downloadFile(dataUrl, `${baseName}-colored-${exportSize}px`, format)
            }
            URL.revokeObjectURL(url)
        }
        img.src = url
    }

    const downloadAll = () => {
        if (svgs.length === 0) return
        saveToHistory(color, bgColor, isBgTransparent, exportSize, format)
        // Small timeout to not freeze UI immediately on click if many icons
        setTimeout(() => {
            svgs.forEach(downloadSvgAs)
        }, 50)
    }

    const getExportBlob = (svgItem: SvgItem): Promise<{ name: string, blob: Blob, ext: string }> => {
        return new Promise((resolve) => {
            const coloredContent = getColoredSvg(svgItem.content, color)
            const baseName = svgItem.name.replace(".svg", "")

            let finalSvgContent = coloredContent
            if (!isBgTransparent) {
                finalSvgContent = coloredContent.replace(
                    /(<svg[^>]*>)/i,
                    `$1<rect width="100%" height="100%" fill="${bgColor}" />`
                )
            }

            if (format === "svg") {
                const blob = new Blob([finalSvgContent], { type: "image/svg+xml;charset=utf-8" })
                resolve({ name: baseName, blob, ext: "svg" })
                return
            }

            const img = new Image()
            const svgBlob = new Blob([finalSvgContent], { type: "image/svg+xml;charset=utf-8" })
            const url = URL.createObjectURL(svgBlob)

            img.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = exportSize
                canvas.height = exportSize
                const ctx = canvas.getContext("2d")

                if (ctx) {
                    if (format === "jpeg" || !isBgTransparent) {
                        ctx.fillStyle = !isBgTransparent ? bgColor : "#ffffff"
                        ctx.fillRect(0, 0, exportSize, exportSize)
                    }

                    ctx.drawImage(img, 0, 0, exportSize, exportSize)
                    const mimeType = `image/${format}`
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve({ name: baseName, blob, ext: format })
                        }
                    }, mimeType)
                }
                URL.revokeObjectURL(url)
            }
            img.src = url
        })
    }

    const exportAsZip = async () => {
        if (svgs.length === 0) return
        saveToHistory(color, bgColor, isBgTransparent, exportSize, format)

        const JSZip = (await import("jszip")).default
        const zip = new JSZip()

        for (const svg of svgs) {
            const { name, blob, ext } = await getExportBlob(svg)
            zip.file(`${name}-colored-${exportSize}px.${ext}`, blob)
        }

        const zipBlob = await zip.generateAsync({ type: "blob" })
        const url = URL.createObjectURL(zipBlob)
        downloadFile(url, `icons-${exportSize}px.zip`, "zip")
        URL.revokeObjectURL(url)
    }

    const exportToFolder = async () => {
        if (svgs.length === 0) return

        if (!('showDirectoryPicker' in window)) {
            alert(t('controls.unsupported_folder_api'))
            return
        }

        try {
            const dirHandle = await (window as any).showDirectoryPicker({ mode: "readwrite" })
            saveToHistory(color, bgColor, isBgTransparent, exportSize, format)

            for (const svg of svgs) {
                const { name, blob, ext } = await getExportBlob(svg)
                const fileHandle = await dirHandle.getFileHandle(`${name}-colored-${exportSize}px.${ext}`, { create: true })
                const writable = await fileHandle.createWritable()
                await writable.write(blob)
                await writable.close()
            }
        } catch (err) {
            console.error("Save to folder failed or cancelled", err)
        }
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-4rem)] w-full p-2 md:p-4 overflow-hidden flex flex-col">
            {/* Mobile TabList (Visible < md) */}
            <div className="flex md:hidden mb-2 shrink-0">
                <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="controls">{t('app.manipulation')}</TabsTrigger>
                    <TabsTrigger value="workspace">{t('app.workspace')}</TabsTrigger>
                    <TabsTrigger value="library">{t('app.library')}</TabsTrigger>
                </TabsList>
            </div>

            {/* Tablet/Narrow PC TabList (md to < xl), Sidebar is visible, switch Workspace/Library */}
            <div className="hidden md:flex xl:hidden mb-2 shrink-0 justify-end">
                <TabsList className="w-[400px] grid grid-cols-2">
                    <TabsTrigger value="workspace">{t('app.workspace')}</TabsTrigger>
                    <TabsTrigger value="library">{t('app.library')}</TabsTrigger>
                </TabsList>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0 min-w-0">
                {/* 1. Sidebar for Controls */}
                <TabsContent
                    value="controls"
                    forceMount={true}
                    className={`m-0 h-full w-full md:w-80 shrink-0 flex-col bg-card border shadow-sm rounded-lg overflow-hidden outline-none ${activeTab === 'controls' ? 'flex' : 'hidden md:flex'}`}
                >
                    <CardHeader className="shrink-0 border-b py-4 pb-3 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-xl">{t('app.manipulation')}</CardTitle>
                        {history.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:text-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-xs">{t('controls.history')}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    {history.map((h) => (
                                        <DropdownMenuItem
                                            key={h.timestamp}
                                            className="flex items-center justify-between cursor-pointer"
                                            onClick={() => applyHistory(h)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full border shadow-sm" style={{ backgroundColor: h.color }} />
                                                <span className="text-sm font-mono">{h.size}px</span>
                                            </div>
                                            <Badge variant="secondary" className="text-[10px] uppercase">{h.format}</Badge>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto space-y-6 pt-5">
                        {/* Color Section */}
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 font-semibold">
                                    <Palette className="h-4 w-4" /> {t('controls.target_color')}
                                </Label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-14 h-10 p-1 cursor-pointer rounded bg-background"
                                    />
                                    <Input
                                        type="text"
                                        value={color.toUpperCase()}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="flex-1 uppercase font-mono"
                                    />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 p-0" align="end">
                                            <ScrollArea className="h-80 w-full rounded-md border">
                                                <div className="p-4 space-y-4">
                                                    {Object.keys(TAILWIND_COLORS).map(colorKey => (
                                                        <div key={colorKey} className="space-y-1.5">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-sm font-semibold capitalize">{t(`colors.${colorKey}`)}</h4>
                                                                <span className="text-[10px] text-muted-foreground w-3/5 truncate text-right border-b border-dashed border-muted inline-block" title={t(`colors.usage.${colorKey}`)}>
                                                                    {t(`colors.usage.${colorKey}`)}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {TAILWIND_COLORS[colorKey].map((hex, idx) => (
                                                                    <button
                                                                        key={hex}
                                                                        onClick={() => setColor(hex)}
                                                                        className={`w-6 h-6 rounded border shadow-sm transition-transform hover:scale-110 ${color === hex ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                                                                        style={{ backgroundColor: hex }}
                                                                        title={`${t(`colors.${colorKey}`)}-${(idx + 1) * 100 > 950 ? 950 : (idx + 1) * 100} (${hex.toUpperCase()})`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            {/* Background Color Section */}
                            <div className="space-y-3 pt-2 border-t">
                                <Label className="flex items-center justify-between font-semibold">
                                    <div className="flex items-center gap-2">
                                        <Palette className="h-4 w-4" /> {t('controls.bg_color')}
                                    </div>
                                </Label>

                                <div className="flex gap-2">
                                    <Button
                                        variant={isBgTransparent ? "default" : "outline"}
                                        className="flex-1"
                                        onClick={() => setIsBgTransparent(true)}
                                        size="sm"
                                    >
                                        {t('controls.transparent_bg')}
                                    </Button>
                                    <Button
                                        variant={!isBgTransparent ? "default" : "outline"}
                                        className="flex-1"
                                        onClick={() => setIsBgTransparent(false)}
                                        size="sm"
                                    >
                                        {t('controls.bg_color')}
                                    </Button>
                                </div>

                                {!isBgTransparent && (
                                    <div className="flex gap-2 items-center slide-in-from-top-2 animate-in duration-200">
                                        <Input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-14 h-10 p-1 cursor-pointer rounded bg-background"
                                        />
                                        <Input
                                            type="text"
                                            value={bgColor.toUpperCase()}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="flex-1 uppercase font-mono"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Size Section */}
                        <div className="space-y-4 pt-1">
                            <Label className="flex items-center justify-between font-semibold">
                                <span>{t('controls.export_size')}</span>
                                <span className="font-mono text-muted-foreground">{deferredExportSize}px</span>
                            </Label>
                            <div className="flex flex-wrap gap-1.5 pb-2">
                                {[64, 128, 256, 512, 1024].map((size) => (
                                    <Badge
                                        key={size}
                                        variant={exportSize === size ? "default" : "secondary"}
                                        className="cursor-pointer hover:bg-primary/80"
                                        onClick={() => setExportSize(size)}
                                    >
                                        {size}
                                    </Badge>
                                ))}
                            </div>
                            <Slider
                                value={[exportSize]}
                                onValueChange={(v) => setExportSize(v[0])}
                                min={16}
                                max={1024}
                                step={8}
                                className="w-full"
                            />
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    value={exportSize}
                                    onChange={(e) => setExportSize(Number(e.target.value))}
                                    className="font-mono"
                                />
                            </div>
                        </div>

                        {/* Format Section */}
                        <div className="space-y-3 pt-1">
                            <Label className="flex items-center gap-2 font-semibold">
                                {t('controls.export_format')}
                            </Label>
                            <Select value={format} onValueChange={(val: ExportFormat) => setFormat(val)}>
                                <SelectTrigger className="w-full font-mono uppercase">
                                    <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="svg" className="font-mono">SVG</SelectItem>
                                    <SelectItem value="png" className="font-mono">PNG</SelectItem>
                                    <SelectItem value="jpeg" className="font-mono">JPEG</SelectItem>
                                    <SelectItem value="webp" className="font-mono">WEBP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="pt-4 space-y-2 border-t">
                            <Button className="w-full font-semibold" disabled={svgs.length === 0} onClick={downloadAll}>
                                <Download className="mr-2 h-4 w-4" /> {t('controls.export_all')} ({svgs.length})
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="flex-1 text-xs" disabled={svgs.length === 0} onClick={exportAsZip}>
                                    <Archive className="mr-1.5 h-3.5 w-3.5" /> {t('controls.export_zip')}
                                </Button>
                                <Button variant="secondary" className="flex-1 text-xs" disabled={svgs.length === 0} onClick={exportToFolder}>
                                    <FolderOutput className="mr-1.5 h-3.5 w-3.5" /> {t('controls.save_as')}
                                </Button>
                            </div>
                            {svgs.length > 0 && (
                                <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 mt-1" onClick={clearAll}>
                                    <Trash2 className="mr-2 h-4 w-4" /> {t('controls.clear')}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </TabsContent>

                {/* 2. Workspace Panel */}
                <TabsContent
                    value="workspace"
                    forceMount={true}
                    className={`m-0 h-full flex-[3] min-w-0 flex-col bg-background rounded-lg border shadow-sm overflow-hidden outline-none ${activeTab === 'workspace' ? 'flex' : 'hidden xl:flex'}`}
                >
                    <div className="px-6 py-4 border-b flex items-center justify-between bg-muted/30 shrink-0">
                        <h2 className="flex items-center gap-2 font-semibold text-lg">
                            <LayoutGrid className="h-5 w-5" /> {t('app.workspace')} ({svgs.length})
                        </h2>
                        <div className="flex gap-2">
                            <input
                                type="file"
                                multiple
                                accept=".svg"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" /> {t('workspace.upload_btn')}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto bg-muted/10">
                        {svgs.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl p-12 bg-background/50">
                                <Upload className="h-12 w-12 mb-4 opacity-30" />
                                <p className="text-lg font-medium text-foreground">{t('workspace.empty')}</p>
                                <p className="text-sm mt-1">{t('workspace.upload_hint')}</p>
                                <Button variant="secondary" className="mt-6 font-semibold" onClick={() => fileInputRef.current?.click()}>
                                    {t('workspace.browse')}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-6 pb-4 items-start">
                                {svgs.map((svg) => {
                                    // Visual constraints for UX
                                    const renderedWidth = Math.max(80, deferredExportSize)
                                    const renderedHeight = Math.max(80, deferredExportSize)

                                    // Make sure inner SVG tag resizes explicitly (using React regex trick on SVG content)
                                    let previewContent = getColoredSvg(svg.content, deferredColor)
                                    // Strip explicit width/height natively inside icon to let container boundaries hold it seamlessly
                                    previewContent = previewContent.replace(/width="[^"]+"/, `width="100%"`)
                                    previewContent = previewContent.replace(/height="[^"]+"/, `height="100%"`)

                                    return (
                                        <Card
                                            key={svg.id}
                                            className="group relative overflow-hidden flex flex-col p-0 border shadow-sm bg-card rounded-md shrink-0 transition-transform hover:shadow-md hover:border-primary/40"
                                        >
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-full shadow-md hover:scale-105"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeSvg(svg.id)
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <div
                                                className="bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3hFq4ABxGoYVQJ/vYHgwYEQXwK92sHsQmX5gGMEjMAwDBQDAPwYgHn7j2wAAAABJRU5ErkJggg==')] flex items-center justify-center relative transition-colors duration-200"
                                                style={{
                                                    width: `${renderedWidth}px`,
                                                    height: `${renderedHeight}px`,
                                                    backgroundColor: deferredIsBgTransparent ? 'transparent' : deferredBgColor
                                                }}
                                            >
                                                <div
                                                    className="w-full h-full flex items-center justify-center p-2"
                                                    dangerouslySetInnerHTML={{ __html: previewContent }}
                                                />
                                            </div>
                                            <div className="px-2 py-2 border-t text-[11px] truncate text-center font-medium bg-muted/40 w-full" title={svg.name}>
                                                {svg.name}
                                                <span className="ml-1 text-[10px] text-muted-foreground">({deferredExportSize}px)</span>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* 3. Icon Library Panel */}
                <TabsContent
                    value="library"
                    forceMount={true}
                    className={`m-0 h-full flex-[2] min-w-0 flex-col outline-none ${activeTab === 'library' ? 'flex' : 'hidden xl:flex'}`}
                >
                    <IconLibrary
                        onAddIcons={handleAddIcons}
                        addedIconNames={svgs.map(s => s.name.replace(".svg", ""))}
                        onRemoveIcon={removeSvgByName}
                    />
                </TabsContent>
            </div>
        </Tabs>
    )
}
