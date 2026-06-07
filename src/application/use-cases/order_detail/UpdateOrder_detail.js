export default class UpdateOrder_detail {
  constructor(order_detailRepository) {
    this.order_detailRepository = order_detailRepository;
  }

  async execute(id, order_detailData) {
    return await this.order_detailRepository.update(
      id,
      order_detailData
    );
  }
}