import { ItemView, WorkspaceLeaf } from 'obsidian'

import WordSight from './WordSight.svelte'

export const VIEW_TYPE_WORD_SIGHT = 'word-sight-view'

export class WordSightView extends ItemView {
    component: WordSight | null = null

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
    }

    getViewType() {
        return VIEW_TYPE_WORD_SIGHT
    }

    getDisplayText() {
        return 'Word Sight'
    }

    async onOpen() {
        this.component = new WordSight({
            target: this.contentEl,
            props: {
                statistics: {
                    basic: 1000,
                    intermediate: 200,
                    advanced: 10,
                    specialized: 104,
                    idiomatic: 50,
                },
            },
        })
    }

    async onClose() {
        this.component?.$destroy()
    }
}
