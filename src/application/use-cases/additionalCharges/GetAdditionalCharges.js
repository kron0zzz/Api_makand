export default class GetAdditionalCharges {
  constructor(additionalChargeRepository) {
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute() {
    return await this.additionalChargeRepository.findAll();
  }
}