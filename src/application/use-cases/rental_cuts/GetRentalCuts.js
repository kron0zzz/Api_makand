export default class GetRentalCuts {
  constructor(rentalCutRepository) {
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute() {
    return await this.rentalCutRepository.findAll();
  }
}