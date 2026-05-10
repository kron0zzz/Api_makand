export default class UpdateSupplier {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(id, supplierData) {
    return await this.supplierRepository.update(
      id,
      supplierData
    );
  }
}