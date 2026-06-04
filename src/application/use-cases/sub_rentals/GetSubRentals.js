export default class GetSubRentals {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute() {
    return await this.subRentalRepository.findAll();
  }
}