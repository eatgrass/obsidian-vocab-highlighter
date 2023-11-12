import { Setting, PluginSettingTab, SliderComponent } from 'obsidian'
import type VocabHightlightPlugin from 'main'
import { getSettings, updateSettings, type HighlightSettings } from 'Settings'
import { create } from 'domain'

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
                slide.setLimits(0, 60100, 100).setDynamicTooltip()
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
                picker.setValue(getSettings()[category].bg)
                picker.onChange((value) => {
                    let s = getSettings()
                    updateSettings({
                        [category]: { ...s[category], bg: value },
                    })
                })
            })
            .addToggle((toggle) => {
                toggle.setValue(getSettings()[category].enabled)
                toggle.onChange((value) => {
                    let s = getSettings()
                    updateSettings({
                        [category]: { ...s[category], enabled: value },
                    })
                })
            })
    }


    public display() {
        const { containerEl } = this
        containerEl.empty()
        containerEl.createEl('h3', { text: 'Hightlight Settings' })
        new Setting(containerEl).setName('Translucency').addSlider((slide) => {
			slide.setDynamicTooltip()
            slide.setLimits(0, 1, 0.05)
            slide.setValue(getSettings().translucency)
            slide.onChange((value) => {
                updateSettings({
                    translucency: value,
                })
            })
        })
        this.createHighlightSetting(containerEl, 'basic')
        this.createHighlightSetting(containerEl, 'advanced')
        this.createHighlightSetting(containerEl, 'intermediate')
        this.createHighlightSetting(containerEl, 'specialized')
        this.createHighlightSetting(containerEl, 'idiomatic')
    }
}
