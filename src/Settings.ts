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
        bg: '#98FF98',
        fg: 'black',
        rank: 3000,
        enabled: true,
    },
    intermediate: {
        bg: '#87CEEB',
        fg: 'black',
        rank: 8000,
        enabled: true,
    },
    advanced: {
        bg: '#FFD700',
        fg: 'black',
        rank: 16000,
        enabled: true,
    },
    specialized: {
        bg: '#FF7F50',
        fg: 'black',
        rank: 25000,
        enabled: true,
    },
    idiomatic: {
        bg: '#E6E6FA',
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
    return settings
}
