export default class GetPurchaseInvoices {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute() {
    return await this.purchaseInvoiceRepository.findAll();
  }
}