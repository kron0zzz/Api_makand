export default class GetOrder_detailById {
  constructor(order_detailRepository) {
    this.order_detailRepository = order_detailRepository;
  }

  async execute(id) {
    return await this.order_detailRepository.findById(id);
  }
}