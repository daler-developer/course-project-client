import create from "zustand";

interface IState {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const useStore = create<IState>((set) => ({
  isDrawerOpen: false,
  openDrawer() {
    set({ isDrawerOpen: true });
  },
  closeDrawer() {
    set({ isDrawerOpen: false });
  },
}));

export default useStore;
