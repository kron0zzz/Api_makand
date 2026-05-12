export default class GetVehicles {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute() {
    return await this.vehicleRepository.findAll();
  }
}
