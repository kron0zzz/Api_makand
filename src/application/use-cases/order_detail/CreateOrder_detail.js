export default class CreateOrder_detail {
  constructor(order_detailRepository) {
    this.order_detailRepository = order_detailRepository;
  }

  async execute(order_detailData) {
    return await this.order_detailRepository.create(order_detailData);
  }
}