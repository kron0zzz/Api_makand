export default class DeleteSupplier {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(id) {
    return await this.supplierRepository.delete(id);
  }
}