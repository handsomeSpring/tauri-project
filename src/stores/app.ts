import { defineStore } from "pinia"

export const useAppStore = defineStore('appStore', {
    state: () => ({
        isCollapse: false
    }),
    actions: {
        setCollapse(isCol: boolean) {
            this.isCollapse = isCol
        },
    }
})
