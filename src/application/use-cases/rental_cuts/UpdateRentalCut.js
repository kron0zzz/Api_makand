export default class UpdateRentalCut {
  constructor(rentalCutRepository) {
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute(id, rentalCutData) {
    return await this.rentalCutRepository.update(
      id,
      rentalCutData
    );
  }
}