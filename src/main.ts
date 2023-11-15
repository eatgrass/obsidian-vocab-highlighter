import { Menu, Notice, Plugin, TFile } from 'obsidian'
import { wrapTokens } from 'Highlighter'
import HighlistSettingsTab from 'SettingsTab'
import { getSettings, updateSettings } from 'Settings'

export default class VocabHighlighterPlugin extends Plugin {
    async onload() {
        await this.loadSettings()

		this.registerEvent(this.app.workspace.on('editor-menu', (menu) => {
			menu.addItem((item) =>
				item
				.setTitle('Add wordbook')
				.setIcon('documents')
				.onClick(() => {
					new Notice('save')
				}),
			)
		}))

        this.registerMarkdownPostProcessor((element, ctx) => {
            const settings = getSettings()
            const { cssclasses } = ctx.frontmatter || { cssclasses: [] }
            const sholdProcess: boolean =
                settings.globalProcessor ||
                !!cssclasses?.includes('enable-vocab-hl')
            if (sholdProcess) {
                wrapTokens(element, settings)
            }

            // element.addEventListener('contextmenu', (event) => {
            // })
        })

        this.addRibbonIcon('highlighter', 'Highlight vocabulary', () => {
            updateSettings({ enabled: !getSettings().enabled })
        })

        this.addRibbonIcon('text', 'Wordbook', async () => {
            const filePath = 'Wordbook.md' // specify the file path
            const file = this.app.vault.getAbstractFileByPath(filePath)

            if (file instanceof TFile) {
                try {
                    // Read the content of the file
                    const content = await this.app.vault.read(file)
                    console.log('Original Content:', content)

                    // Modify the content
                    const newContent = 'abc '

                    // Write the modified content back to the file
                    await this.app.vault.modify(file, newContent)
                    console.log('Content Updated')
                } catch (error) {
                    console.error('Error editing file:', error)
                }
            } else {
                console.error('File not found or not a markdown file.')
            }
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
