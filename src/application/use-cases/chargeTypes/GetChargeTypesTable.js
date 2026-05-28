export default class GetChargeTypesTable {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute() {
    return await this.chargeTypeRepository.findTableData();
  }
}