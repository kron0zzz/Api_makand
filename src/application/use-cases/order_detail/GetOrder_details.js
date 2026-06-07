export default class GetOrder_details {
  constructor(order_detailRepository) {
    this.order_detailRepository = order_detailRepository;
  }

  async execute() {
    return await this.order_detailRepository.findAll();
  }
}