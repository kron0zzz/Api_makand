export default class GetPurchaseInvoiceDetails {
  constructor(purchaseInvoiceDetailRepository) {
    this.purchaseInvoiceDetailRepository = purchaseInvoiceDetailRepository;
  }
  async execute() {
    return await this.purchaseInvoiceDetailRepository.findAll();
  }
}
