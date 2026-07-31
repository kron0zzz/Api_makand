import DashboardRepository from "../../infrastructure/repositories/DashboardRepository.js";

const dashboardRepository = new DashboardRepository();

export default class GetDashboardStats {

  constructor(dashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async execute(limit) {
    return await this.dashboardRepository.getStats(limit);
  }
}

export const getDashboardStats = new GetDashboardStats(dashboardRepository);
