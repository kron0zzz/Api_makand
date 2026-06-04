export default class CreateSubRental {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute(subRentalData) {
    return await this.subRentalRepository.create(subRentalData);
  }
}