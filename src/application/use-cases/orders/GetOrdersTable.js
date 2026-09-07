import CutScheduleService, { CUT_STATUS } from "../../../infrastructure/services/CutScheduleService.js";

export default class GetOrdersTable {

  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(page, limit, search) {
    const result = await this.orderRepository.findTableData(page, limit, search);

    const referenceDate = new Date();

    const enrichedData = await Promise.all(
      result.data.map(async (order) => {
        const cutInfo = await this.getCutInfo(order, referenceDate);
        return {
          ...order,
          ...cutInfo
        };
      })
    );

    return {
      ...result,
      data: enrichedData
    };
  }

  async getCutInfo(order, referenceDate) {
    if (!order.cut_frequency) {
      return {
        cut_status: CUT_STATUS.UP_TO_DATE,
        pending_cuts_count: 0
      };
    }

    const cuts = await this.orderRepository.findCutsByOrderId(order.order_id);
    const startDate = order.order_creation_date;

    return CutScheduleService.calculateCutInfo(
      startDate,
      order.cut_frequency,
      cuts.map(c => c.period_end_date),
      referenceDate
    );
  }
}