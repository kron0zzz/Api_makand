export default class UpdateOrderStatus {
  constructor(orderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute(id, orderStatusData) {
    return await this.orderStatusRepository.update(id, orderStatusData);
  }
}