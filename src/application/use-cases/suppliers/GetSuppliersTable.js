export default class GetSuppliersTable {

  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async execute(page, limit, search) {
    return await this.supplierRepository.findTableData(page, limit, search);
  }

}