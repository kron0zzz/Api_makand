export default class DeleteSubRental {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute(id) {
    return await this.subRentalRepository.delete(id);
  }
}