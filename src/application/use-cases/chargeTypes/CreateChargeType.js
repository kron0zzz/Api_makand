export default class CreateChargeType {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute(chargeTypeData) {
    return await this.chargeTypeRepository.create(chargeTypeData);
  }
}