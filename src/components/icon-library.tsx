import { useState, useRef, useMemo, useEffect } from "react"
import { icons } from "lucide-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { renderToStaticMarkup } from "react-dom/server"
import { Search, Library, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"

interface IconLibraryProps {
    onAddIcons: (selectedIcons: { name: string; content: string }[]) => void
    addedIconNames: string[]
    onRemoveIcon: (name: string) => void
}

export function IconLibrary({ onAddIcons, addedIconNames, onRemoveIcon }: IconLibraryProps) {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")
    const [containerWidth, setContainerWidth] = useState(0)
    const parentRef = useRef<HTMLDivElement>(null)

    const allIcons = useMemo(() => Object.entries(icons), [])
    const filteredIcons = useMemo(() => {
        if (!search) return allIcons
        return allIcons.filter(([name]) =>
            name.toLowerCase().includes(search.toLowerCase())
        )
    }, [allIcons, search])

    // Responsive columns calculation
    useEffect(() => {
        if (!parentRef.current) return
        const resizeObserver = new ResizeObserver((entries) => {
            setContainerWidth(entries[0].contentRect.width)
        })
        resizeObserver.observe(parentRef.current)
        return () => resizeObserver.disconnect()
    }, [])

    const ITEM_WIDTH = 80 // Base width/height
    const GAP = 16
    const columns = Math.max(3, Math.floor((containerWidth + GAP) / (ITEM_WIDTH + GAP))) || 3
    const rowCount = Math.ceil(filteredIcons.length / columns)

    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ITEM_WIDTH + GAP,
        overscan: 5,
    })

    const handleAddIcon = (name: string, IconComponent: any) => {
        const content = renderToStaticMarkup(<IconComponent strokeWidth={2} />)
        onAddIcons([{ name: `${name}.svg`, content }])
    }

    return (
        <div className="flex flex-col h-full w-full bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between bg-muted/30 shrink-0">
                <h2 className="flex items-center gap-2 font-semibold">
                    <Library className="h-5 w-5" /> {t('app.library')}
                </h2>
            </div>

            <div className="p-3 border-b shrink-0 bg-background">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={t('library.search')}
                        className="pl-9 bg-muted/50 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div
                ref={parentRef}
                className="flex-1 overflow-y-auto px-4 pb-4 bg-muted/5"
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                        marginTop: '16px'
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const startIndex = virtualRow.index * columns
                        const rowIcons = filteredIcons.slice(startIndex, startIndex + columns)

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${ITEM_WIDTH}px`, // Fixed height per row
                                    transform: `translateY(${virtualRow.start}px)`,
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                    gap: `${GAP}px`,
                                }}
                            >
                                {rowIcons.map(([name, IconComponent]) => {
                                    const Icon = IconComponent as any
                                    const isAdded = addedIconNames.includes(name)

                                    return (
                                        <div
                                            key={name}
                                            onClick={() => !isAdded && handleAddIcon(name, IconComponent)}
                                            className={`group relative flex flex-col items-center justify-center p-2 rounded-md border shadow-sm transition-all min-w-0 h-full w-full
                                                ${isAdded
                                                    ? 'bg-primary/5 border-primary/20 text-muted-foreground'
                                                    : 'cursor-pointer hover:bg-muted/50 bg-background hover:border-primary/50 active:scale-95'
                                                }`}
                                            title={isAdded ? t('library.selected') : name}
                                        >
                                            <Icon className={`h-6 w-6 mb-2 shrink-0 ${!isAdded ? 'group-hover:text-primary transition-colors' : 'opacity-50'}`} strokeWidth={1.5} />
                                            <span className={`text-[10px] pb-1 text-center truncate w-full px-1 ${isAdded ? 'opacity-50' : ''}`}>{name}</span>

                                            {isAdded && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onRemoveIcon(name)
                                                    }}
                                                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110 z-10"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {filteredIcons.length === 0 && (
                    <div className="text-center text-muted-foreground mt-12 flex flex-col items-center">
                        <Search className="h-8 w-8 mb-2 opacity-20" />
                        <p className="text-sm">{t('library.empty')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
