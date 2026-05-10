export default class DeletePurchase {
   
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    async execute(id) {
        return await this.purchaseRepository.delete(id);
    }
}