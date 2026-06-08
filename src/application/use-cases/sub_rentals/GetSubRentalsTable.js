export default class GetSubRentalsTable {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute() {
    return await this.subRentalRepository.findTableData();
  }
}