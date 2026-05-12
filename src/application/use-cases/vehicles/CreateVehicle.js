export default class CreateVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(vehicleData) {
    return await this.vehicleRepository.create(vehicleData);
  }
}
