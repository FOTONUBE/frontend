import { create } from "zustand"

interface AppState {
  isMenuOpen: boolean
  activeTestimonial: number
  expandedFaq: number | null
  setMenuOpen: (open: boolean) => void
  setActiveTestimonial: (index: number) => void
  setExpandedFaq: (index: number | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  activeTestimonial: 0,
  expandedFaq: null,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setActiveTestimonial: (index) => set({ activeTestimonial: index }),
  setExpandedFaq: (index) => set({ expandedFaq: index }),
}))
