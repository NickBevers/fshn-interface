import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        color: '',
        size: '',
        productId: [ '' ],
        amount: 0
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
        },
        setAmount(amount: number) {
            this.amount = amount
        }
    },
    getters: {
        getColor():string {
            return this.color
        },
        getSize():string {
            return this.size
        },
        getProductId():Array<string> {
            return this.productId
        },
        getAmount():number {
            return this.amount
        }
    }
});