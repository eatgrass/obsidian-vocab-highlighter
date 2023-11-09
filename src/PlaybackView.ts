import { ItemView, WorkspaceLeaf } from "obsidian";

import Component from "./Component.svelte";

export const VIEW_TYPE_PLAYBACK = "example-view";

export class PlaybackView extends ItemView {
	component: Component | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_PLAYBACK;
	}

	getDisplayText() {
		return "Playback";
	}

	async onOpen() {
		this.component = new Component({
			target: this.contentEl,
			props: {
				variable: 1,
			},
		});
	}

	async onClose() {
		this.component?.$destroy();
	}
}
