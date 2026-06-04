export default class GetChargeTypeById {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute(id) {
    return await this.chargeTypeRepository.findById(id);
  }
}