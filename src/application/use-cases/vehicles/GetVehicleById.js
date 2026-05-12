export default class GetVehicleById {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id) {
    return await this.vehicleRepository.findById(id);
  }
}
