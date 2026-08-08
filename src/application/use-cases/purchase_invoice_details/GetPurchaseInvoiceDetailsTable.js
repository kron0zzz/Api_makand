export default class GetPurchaseInvoiceDetailsTable {
  constructor(purchaseInvoiceDetailRepository) {
    this.purchaseInvoiceDetailRepository = purchaseInvoiceDetailRepository;
  }
  async execute(page, limit, search) {
    return await this.purchaseInvoiceDetailRepository.findTableData(page, limit, search);
  }
}
