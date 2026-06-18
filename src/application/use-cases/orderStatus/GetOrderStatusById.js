export default class GetOrderStatusById {
  constructor(orderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute(id) {
    return await this.orderStatusRepository.findById(id);
  }
}