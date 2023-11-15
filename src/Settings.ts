import { rerender } from "Highlighter"

export interface HighlightSettings {
    basic: Highlight
    intermediate: Highlight
    advanced: Highlight
    specialized: Highlight
    idiomatic: Highlight
    translucency: number
    enabled: boolean
	globalProcessor: boolean,
}

interface Highlight {
    bg: string
    fg: string
    rank: number
    enabled: boolean
}

export const DEFAULT_SETTINGS: HighlightSettings = {

    translucency: 0.5,
    enabled: true,
	globalProcessor: true,
    basic: {
        bg: '48, 51, 64',
        fg: 'black',
        rank: 6000,
        enabled: true,
    },
    intermediate: {
        bg: '208, 103, 157',
        fg: 'black',
        rank: 16500,
        enabled: true,
    },
    advanced: {
        bg: '95, 179, 161',
        fg: 'black',
        rank: 30000,
        enabled: true,
    },
    specialized: {
        bg: '173, 215, 255',
        fg: 'black',
        rank: 45000,
        enabled: true,
    },
    idiomatic: {
        bg: '115, 144, 170',
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
	rerender(settings)
    return settings
}
