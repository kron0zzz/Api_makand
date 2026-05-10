export default class GetSuppliers {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute() {
    return await this.supplierRepository.findAll();
  }
}