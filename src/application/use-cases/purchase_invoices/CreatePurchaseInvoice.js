export default class CreatePurchaseInvoice {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute(invoiceData) {
    return await this.purchaseInvoiceRepository.create(invoiceData);
  }
}