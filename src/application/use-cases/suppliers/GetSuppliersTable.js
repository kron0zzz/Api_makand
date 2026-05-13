export default class GetSuppliersTable {

  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute() {
    return await this.supplierRepository.findTableData();
  }

}