import { getDashboardStats } from "../../application/use-cases/dashboard/GetDashboardStats.js";

export const getDashboardStatsHandler = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const stats = await getDashboardStats.execute(limit);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
