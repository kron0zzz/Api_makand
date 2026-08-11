export default class GetAdditionalChargeById {
  constructor(additionalChargeRepository) {
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(id) {
    return await this.additionalChargeRepository.findById(id);
  }
}