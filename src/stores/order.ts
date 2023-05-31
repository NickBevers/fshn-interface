import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        color: '',
        size: ''
    }),
    actions: {
        setColor(color: string) {
            this.color = color
        },
        setSize(size: string) {
            this.size = size
        }
    },
    getters: {
        getColor():any {
            return this.color
        },
        getSize():any {
            return this.size
        }
    }
});