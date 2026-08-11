export default class DeleteAdditionalCharge {
  constructor(additionalChargeRepository) {
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(id) {
    return await this.additionalChargeRepository.delete(id);
  }
}