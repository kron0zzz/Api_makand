export default class DeleteOrder_detail {
  constructor(order_detailRepository) {
    this.order_detailRepository = order_detailRepository;
  }

  async execute(id) {
    return await this.order_detailRepository.delete(id);
  }
}