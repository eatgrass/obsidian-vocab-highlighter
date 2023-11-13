import { tokenize } from './Tokenizer'
import { query } from '../Dictionary'
import { type HighlightSettings } from 'Settings'

export const wrapTokens = async (
    el: Node,
    settings: HighlightSettings,
): Promise<void> => {
    if (el.nodeType === Node.TEXT_NODE) {
        let tokens = tokenize(el.textContent)
        const nodes = await Promise.all(
            tokens.map((word) => createNodes(word, settings)),
        )
        const fragment = new DocumentFragment()
        fragment.append(...nodes)
        fragment.normalize()
        el.parentElement?.replaceChild(fragment, el)
    } else if (el.nodeType === Node.ELEMENT_NODE) {
        const children = el.childNodes
        for (let i = 0; i < children.length; i++) {
            wrapTokens(children[i], settings)
        }
    }
}
const createNodes = async (
    token: string,
    settings: HighlightSettings,
): Promise<Node> => {
    const rank = await query(token.toLowerCase())

    // If word is not found, return a text node
    if (!rank) {
        return document.createTextNode(token)
    }
    // Create a span element
    const span = document.createElement('span')
    span.textContent = token // Changed from setText to textContent
    span.className = 'vocab-hl'

    // Determine the background color based on the rank
    const getBgColor = () => {
        const levels = [
            settings.basic,
            settings.intermediate,
            settings.advanced,
            settings.specialized,
            settings.idiomatic,
        ]

        for (let i = 0; i < levels.length; i++) {
            if (rank < levels[i].rank) {
                if (levels[i].enabled) {
                    return `vocab-hl-${i + 1}`
                } else {
                    return ''
                }
            }
        }

        return '' // Default color if none of the conditions are met
    }
    span.className = `vocab-hl ${getBgColor()}`

    // span.style.background = getBgColor() || 'transparent' // Use default color if getColor returns null

    return span
}
