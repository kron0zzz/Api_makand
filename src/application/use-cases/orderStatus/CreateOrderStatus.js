export default class CreateOrderStatus {
  constructor(orderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute(orderStatusData) {
    return await this.orderStatusRepository.create(orderStatusData);
  }
}