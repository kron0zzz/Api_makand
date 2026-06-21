export default class GetRentalCutById {
  constructor(rentalCutRepository) {
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute(id) {
    return await this.rentalCutRepository.findById(id);
  }
}