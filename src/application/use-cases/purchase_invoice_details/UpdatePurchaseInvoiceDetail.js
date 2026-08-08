export default class UpdatePurchaseInvoiceDetail {
  constructor(purchaseInvoiceDetailRepository) {
    this.purchaseInvoiceDetailRepository = purchaseInvoiceDetailRepository;
  }
  async execute(id, detailData) {
    return await this.purchaseInvoiceDetailRepository.update(id, detailData);
  }
}
