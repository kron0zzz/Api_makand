export default class GetSubRentalsTable {
  constructor(subRentalRepository) {
    this.subRentalRepository = subRentalRepository;
  }
  async execute(page, limit, search) {
    return await this.subRentalRepository.findTableData(page, limit, search);
  }
}