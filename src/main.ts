import { Menu, Notice, Plugin, TFile, setTooltip } from 'obsidian'
import { wrapTokens } from 'Highlighter'
import HighlistSettingsTab from 'SettingsTab'
import { getSettings, updateSettings } from 'Settings'

export default class VocabHighlighterPlugin extends Plugin {

    async onload() {

        await this.loadSettings()

        this.registerMarkdownPostProcessor((element, ctx) => {
            const settings = getSettings()
            const { cssclasses } = ctx.frontmatter || { cssclasses: [] }
            const sholdProcess: boolean =
                settings.globalProcessor ||
                !!cssclasses?.includes('enable-vocab-hl')
            if (sholdProcess) {
                wrapTokens(element, settings)
                element.addEventListener('mouseover', (e) => {
                    if (e.target instanceof HTMLElement && settings.enabled) {
                        const ele = e.target as HTMLElement
                        let { rank } = ele.dataset
                        if (rank) {
                            setTooltip(ele, rank, {
                                delay: 300,
                                placement: 'top',
                            })
                        }
                    }
                })
            }
        })

        this.addRibbonIcon('highlighter', 'Highlight vocabulary', () => {
            updateSettings({ enabled: !getSettings().enabled })
        })

        // toogle highlight command
        this.addCommand({
            id: 'toggle-vocab-highlight',
            name: 'Toggle highlight',
            callback: () => {
                updateSettings({ enabled: !getSettings().enabled })
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
}
