export default class DeletePurchaseInvoiceDetail {
  constructor(purchaseInvoiceDetailRepository) {
    this.purchaseInvoiceDetailRepository = purchaseInvoiceDetailRepository;
  }
  async execute(id) {
    return await this.purchaseInvoiceDetailRepository.delete(id);
  }
}
