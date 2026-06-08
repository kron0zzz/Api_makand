export default class GetPurchaseInvoicesTable {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute() {
    return await this.purchaseInvoiceRepository.findTableData();
  }
}