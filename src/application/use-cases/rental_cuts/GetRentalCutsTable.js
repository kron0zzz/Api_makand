export default class GetRentalCutsTable {

  constructor(rentalCutRepository) {
    this.rentalCutRepository = rentalCutRepository;
  }

  async execute() {
    return await this.rentalCutRepository.findTableData();
  }

}