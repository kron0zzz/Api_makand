export default class GetPurchaseInvoiceDetailById {
  constructor(purchaseInvoiceDetailRepository) {
    this.purchaseInvoiceDetailRepository = purchaseInvoiceDetailRepository;
  }
  async execute(id) {
    return await this.purchaseInvoiceDetailRepository.findById(id);
  }
}
