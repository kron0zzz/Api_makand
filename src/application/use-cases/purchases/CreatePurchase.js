export default class CreatePurchase {
    constructor(purchaseRepository) {
      this.purchaseRepository = purchaseRepository;
    }
  
    async execute(purchaseData) {
      return await this.purchaseRepository.create(purchaseData);
    }
}