import { create } from 'zustand';

interface UiState {
  showChatInfo: boolean;
  openChatInfo: () => void;
  closeChatInfo: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  showChatInfo: false,
  openChatInfo: () => set({ showChatInfo: true }),
  closeChatInfo: () => set({ showChatInfo: false }),
}));
