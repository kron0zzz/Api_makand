export default class DeletePurchaseInvoice {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute(id) {
    return await this.purchaseInvoiceRepository.delete(id);
  }
}