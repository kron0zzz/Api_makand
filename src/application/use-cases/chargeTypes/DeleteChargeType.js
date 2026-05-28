export default class DeleteChargeType {
  constructor(chargeTypeRepository) {
    this.chargeTypeRepository = chargeTypeRepository;
  }

  async execute(id) {
    return await this.chargeTypeRepository.delete(id);
  }
}