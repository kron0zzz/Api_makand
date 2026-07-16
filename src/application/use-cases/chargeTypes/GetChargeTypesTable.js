export default class GetChargeTypesTable {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute(page, limit, search) {
    return await this.chargeTypeRepository.findTableData(page, limit, search);
  }
}