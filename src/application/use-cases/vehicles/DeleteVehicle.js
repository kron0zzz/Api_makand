export default class DeleteVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id) {
    return await this.vehicleRepository.delete(id);
  }
}
