export default class UpdatePurchaseInvoice {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute(id, invoiceData) {
    return await this.purchaseInvoiceRepository.update(id, invoiceData);
  }
}