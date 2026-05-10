export default class GetSupplierById {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(id) {
    return await this.supplierRepository.findById(id);
  }
}