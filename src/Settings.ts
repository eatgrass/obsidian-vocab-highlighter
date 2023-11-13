export interface HighlightSettings {
    basic: Highlight
    intermediate: Highlight
    advanced: Highlight
    specialized: Highlight
    idiomatic: Highlight
    translucency: number
}

interface Highlight {
    bg: string
    fg: string
    rank: number
    enabled: boolean
}

export const DEFAULT_SETTINGS: HighlightSettings = {
    translucency: 0.5,
    basic: {
        bg: '68, 207, 110',
        fg: 'black',
        rank: 3000,
        enabled: true,
    },
    intermediate: {
        bg: '83, 223, 221',
        fg: 'black',
        rank: 8000,
        enabled: true,
    },
    advanced: {
        bg: '233, 151, 63',
        fg: 'black',
        rank: 16000,
        enabled: true,
    },
    specialized: {
        bg: '2, 122, 255',
        fg: 'black',
        rank: 25000,
        enabled: true,
    },
    idiomatic: {
        bg: '168, 130, 255',
        fg: 'black',
        rank: 240000,
        enabled: true,
    },
}

let settings: HighlightSettings = { ...DEFAULT_SETTINGS }

export const getSettings = (): HighlightSettings => settings

export const updateSettings = (
    updated: Partial<HighlightSettings>,
): HighlightSettings => {
    settings = { ...settings, ...updated }
    document.documentElement.style.setProperty(
        '--vocab-hl-opacity',
        settings.translucency.toString(),
    )
    const levels: (
        | 'basic'
        | 'intermediate'
        | 'advanced'
        | 'specialized'
        | 'idiomatic'
    )[] = ['basic', 'intermediate', 'advanced', 'specialized', 'idiomatic']
    for (let level of levels) {
        document.documentElement.style.setProperty(
            `--vocab-hl-${level}`,
            settings[level].bg,
        )
    }
    return settings
}
