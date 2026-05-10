export default class GetPurchaseById {
    constructor(purchaseRepository) {
      this.purchaseRepository = purchaseRepository;
    }
  
    async execute(id) {
      return await this.purchaseRepository.findById(id);
    }
}