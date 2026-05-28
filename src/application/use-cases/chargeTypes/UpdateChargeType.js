export default class UpdateChargeType {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute(id, chargeTypeData) {
    return await this.chargeTypeRepository.update(id, chargeTypeData);
  }
}