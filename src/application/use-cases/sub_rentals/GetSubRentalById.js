export default class GetSubRentalById {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute(id) {
    return await this.subRentalRepository.findById(id);
  }
}