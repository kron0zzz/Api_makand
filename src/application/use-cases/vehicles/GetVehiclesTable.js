export default class GetVehiclesTable {

  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute() {
    return await this.vehicleRepository.findTableData();
  }

}