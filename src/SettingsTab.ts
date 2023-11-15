import { Setting, PluginSettingTab } from 'obsidian'
import type VocabHightlightPlugin from 'main'
import { getSettings, updateSettings, DEFAULT_SETTINGS } from 'Settings'

export default class HighlistSettingsTab extends PluginSettingTab {
    private plugin: VocabHightlightPlugin

    constructor({ plugin }: { plugin: VocabHightlightPlugin }) {
        super(plugin.app, plugin)
        this.plugin = plugin
    }

    public async saveSettings(update?: boolean): Promise<void> {
        await this.plugin.saveSettings()
        if (update) {
            this.display()
        }
    }
    private static createFragmentWithHTML = (html: string) =>
        createFragment(
            (documentFragment) =>
                (documentFragment.createDiv().innerHTML = html),
        )
    private createHighlightSetting(
        containerEl: HTMLElement,
        category:
            | 'basic'
            | 'intermediate'
            | 'advanced'
            | 'specialized'
            | 'idiomatic',
    ): void {
        new Setting(containerEl)
            .setName(category.charAt(0).toUpperCase() + category.slice(1))
            .addSlider((slide) => {
                slide.setLimits(0, 240000, 100).setDynamicTooltip()
                slide.setValue(getSettings()[category].rank)
                slide.onChange((value) => {
                    let s = getSettings()
                    updateSettings({
                        [category]: { ...s[category], rank: value },
                    })
                    this.plugin.saveSettings()
                })
            })
            .addColorPicker((picker) => {
                let [r, g, b] = getSettings()[category].bg.split(',')
                picker.setValueRgb({ r: +r, g: +g, b: +b })

                picker.onChange(() => {
                    const { r, g, b } = picker.getValueRgb()
                    let s = getSettings()
                    updateSettings({
                        [category]: { ...s[category], bg: `${r}, ${g}, ${b}` },
                    })
                    this.plugin.saveSettings()
                })
            })
            .addToggle((toggle) => {
                toggle.setValue(getSettings()[category].enabled)
                toggle.onChange((value) => {
                    let s = getSettings()
                    updateSettings({
                        [category]: { ...s[category], enabled: value },
                    })
                    this.plugin.saveSettings()
                })
            })
    }

    public display() {
        const { containerEl } = this
        containerEl.empty()
        containerEl.createEl('h3', { text: 'Hightlight Settings' })

        new Setting(containerEl)
            .setName('Global highlight processor')
            .setDesc(
                HighlistSettingsTab.createFragmentWithHTML(
                    '<p>Whether highlight processor should be applied to all documents.</p>' +
                        '<p>Disabling this then you can add <strong><i>enable-vocab-hl</i></strong> to <strong><i>cssclasses</i></strong> in your frontmatter<br>' +
                        'to enable processor for certain documents.</p>' +
                        '<p>Sometimes, it may be necessary to reopen a file to allow the processor to reapply the highlights</p>' +
                        '<p><b> Important: <code>toggle highlight</code> command can only affects the documents that have been processed. </b></p>',
                ),
            )
            .addToggle((toggle) => {
                toggle.setValue(getSettings().globalProcessor)
                toggle.onChange((value) => {
                    updateSettings({
                        globalProcessor: value,
                    })
                    this.plugin.saveSettings()
                })
            })

        new Setting(containerEl).setName('Translucency').addSlider((slide) => {
            slide.setDynamicTooltip()
            slide.setLimits(0, 1, 0.05)
            slide.setValue(getSettings().translucency)
            slide.onChange((value) => {
                updateSettings({
                    translucency: value,
                })
                this.plugin.saveSettings()
            })
        })

        this.createHighlightSetting(containerEl, 'basic')
        this.createHighlightSetting(containerEl, 'intermediate')
        this.createHighlightSetting(containerEl, 'advanced')
        this.createHighlightSetting(containerEl, 'specialized')
        this.createHighlightSetting(containerEl, 'idiomatic')

        new Setting(containerEl).addButton((button) => {
            button.setButtonText('Reset')
            button.onClick(() => {
                updateSettings(DEFAULT_SETTINGS)
                this.plugin.saveSettings()
                this.saveSettings(true)
            })
        })
    }
}
