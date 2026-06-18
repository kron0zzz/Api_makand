export default class DeleteOrderStatus {
  constructor(orderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute(id) {
    return await this.orderStatusRepository.delete(id);
  }
}