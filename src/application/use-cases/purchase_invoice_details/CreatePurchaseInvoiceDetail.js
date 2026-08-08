export default class CreatePurchaseInvoiceDetail {
  constructor(purchaseInvoiceDetailRepository) {
    this.purchaseInvoiceDetailRepository = purchaseInvoiceDetailRepository;
  }
  async execute(detailData) {
    return await this.purchaseInvoiceDetailRepository.create(detailData);
  }
}
