export default class UpdateAdditionalCharge {
  constructor(additionalChargeRepository) {
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(id, chargeData) {
    return await this.additionalChargeRepository.update(id, chargeData);
  }
}