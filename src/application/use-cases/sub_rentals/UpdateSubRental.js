export default class UpdateSubRental {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute(id, subRentalData) {
    return await this.subRentalRepository.update(id, subRentalData);
  }
}