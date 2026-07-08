export default class DeleteRentalCut{
  constructor(rentalCutRepository) {
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute(id) {
    return await this.rentalCutRepository.delete(id);
  }
}