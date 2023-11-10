import { tokenize } from './Tokenizer'

export function wrapTokens(el: HTMLElement): void {
    const children = el.children
    const text = el.innerText
    if (text) {
        const words = tokenize(text)
        const fragment = new DocumentFragment()
        words.forEach((word) => {
            const span = document.createElement('span')
            span.textContent = word
            span.style.border = '1px solid red'
            fragment.append(span)
        })
        el.parentNode?.replaceChild(fragment, el)
    }

    if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            if (child instanceof HTMLElement) {
                wrapTokens(child)
            }
        }
    }
}
