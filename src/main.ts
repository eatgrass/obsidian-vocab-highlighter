import { Plugin } from 'obsidian'
import { wrapTokens } from 'lib/DomUtil'
import HighlistSettingsTab from 'SettingsTab'
import { getSettings, updateSettings } from 'Settings'

export default class VocabHighlighterPlugin extends Plugin {
    async onload() {
        this.registerMarkdownPostProcessor((element) => {
            wrapTokens(element, getSettings())
        })

        await this.loadSettings()

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
