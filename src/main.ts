import { MarkdownView, Plugin, WorkspaceLeaf } from 'obsidian'
import { wrapTokens } from 'Highlighter'
import HighlistSettingsTab from 'SettingsTab'
import { getSettings, updateSettings } from 'Settings'
import { WordSightView, VIEW_TYPE_WORD_SIGHT } from 'WordSight'

export default class VocabHighlighterPlugin extends Plugin {
    async onload() {
        this.registerMarkdownPostProcessor((element) => {
            wrapTokens(element, getSettings())
        })

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', (editor) => {
                let markdownView =
                    this.app.workspace.getActiveViewOfType(MarkdownView)
                if (markdownView) {
                    const word =
                        markdownView.previewMode.containerEl.querySelectorAll(
                            '.vocab-hl',
                        )
                }
            }),
        )

        this.registerView(
            VIEW_TYPE_WORD_SIGHT,
            (leaf) => new WordSightView(leaf),
        )
        await this.loadSettings()

        // toogle highlight command
        this.addCommand({
            id: 'toggle-highlight',
            name: 'Toggle highlight',
            callback: () => {
                updateSettings({ enabled: !getSettings().enabled })
            },
        })

        this.addCommand({
            id: 'word-sight',
            name: 'Open Word Sight',
            callback: () => {
                this.activateWordSightView()
            },
        })

        // setting tab
        this.addSettingTab(new HighlistSettingsTab({ plugin: this }))
    }

    onunload() {}

    async loadSettings() {
        updateSettings(await this.loadData())
    }

    async saveSettings() {
        await this.saveData(getSettings())
    }

    async activateWordSightView() {
        let { workspace } = this.app

        let leaf: WorkspaceLeaf | null = null
        let leaves = workspace.getLeavesOfType(VIEW_TYPE_WORD_SIGHT)

        if (leaves.length > 0) {
            // A leaf with our view already exists, use that
            leaf = leaves[0]
        } else {
            // Our view could not be found in the workspace, create a new leaf
            // in the right sidebar for it
            let leaf = workspace.getRightLeaf(true)
            await leaf.setViewState({
                type: VIEW_TYPE_WORD_SIGHT,
                active: true,
            })
        }

        // "Reveal" the leaf in case it is in a collapsed sidebar
        if (leaf) {
            workspace.revealLeaf(leaf)
        }
    }
}
