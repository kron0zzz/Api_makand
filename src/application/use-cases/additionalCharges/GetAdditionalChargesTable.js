export default class GetAdditionalChargesTable {
  constructor(additionalChargeRepository) {
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(page, limit, search) {
    return await this.additionalChargeRepository.findTableData(page, limit, search);
  }
}