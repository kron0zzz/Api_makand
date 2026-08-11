export default class CreateAdditionalCharge {
  constructor(additionalChargeRepository) {
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(chargeData) {
    return await this.additionalChargeRepository.create(chargeData);
  }
}