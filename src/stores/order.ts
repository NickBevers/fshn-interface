import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        color: '',
        size: '',
        productId: ['']
    }),
    actions: {
        setColor(color: string) {
            this.color = color
        },
        setSize(size: string) {
            this.size = size
        },
        setProductId(productId: string[]) {
            this.productId = productId
        }
    },
    getters: {
        getColor():any {
            return this.color
        },
        getSize():any {
            return this.size
        },
        getProductId():any {
            return this.productId
        }
    }
});