import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_PLAYBACK = "playback-view";

export class PlaybackView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_PLAYBACK;
  }

  getDisplayText() {
    return "Play";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "player test" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}
