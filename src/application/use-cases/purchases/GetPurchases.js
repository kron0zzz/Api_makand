export default class GetPurchases {
    constructor(purchaseRepository) {
      this.purchaseRepository = purchaseRepository;
    }
  
    async execute() {
      return await this.purchaseRepository.findAll();
    }
}