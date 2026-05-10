export default class CreateSupplier {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(supplierData) {
    return await this.supplierRepository.create(supplierData);
  }
}