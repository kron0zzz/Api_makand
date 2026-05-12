export default class UpdateVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id, vehicleData) {
    return await this.vehicleRepository.update(id, vehicleData);
  }
}
