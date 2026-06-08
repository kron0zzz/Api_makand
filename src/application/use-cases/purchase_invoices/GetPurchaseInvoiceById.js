export default class GetPurchaseInvoiceById {
  constructor(purchaseInvoiceRepository) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
  }
  async execute(id) {
    return await this.purchaseInvoiceRepository.findById(id);
  }
}