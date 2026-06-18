export default class GetOrderStatuss {
  constructor(orderStatusRepository) {
    this.orderStatusRepository = orderStatusRepository;
  }

  async execute() {
    return await this.orderStatusRepository.findAll();
  }
}