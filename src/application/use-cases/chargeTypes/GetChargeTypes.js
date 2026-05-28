export default class GetChargeTypes {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute() {
    return await this.chargeTypeRepository.findAll();
  }
}