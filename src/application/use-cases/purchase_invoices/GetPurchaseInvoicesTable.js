export default class GetPurchaseInvoicesTable {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute(page, limit, search) {
    return await this.purchaseInvoiceRepository.findTableData(page, limit, search);
  }
}