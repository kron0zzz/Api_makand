export default class GetRentalCutByOrderId {
  constructor(rentalCutRepository) {
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute(orderId) {
    return await this.rentalCutRepository.findByOrderId(orderId);
  }
}