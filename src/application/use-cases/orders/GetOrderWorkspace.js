import CutScheduleService, { CUT_STATUS } from "../../../infrastructure/services/CutScheduleService.js";

export default class GetOrderWorkspace {

  constructor(
    orderRepository
  ) {

    this.orderRepository =
      orderRepository;

  }

  async execute(orderId) {

    const order =
      await this.orderRepository
        .findFullById(orderId);

    if (!order) {

      throw new Error(
        "Pedido no encontrado"
      );

    }

    const details =
      await this.orderRepository
        .findWorkspaceData(orderId);

    order.details = details;

    const cutInfo = await this.getCutInfo(order);
    order.cut_status = cutInfo.cut_status;
    order.pending_cuts = cutInfo.pending_cuts;
    order.pending_cuts_count = cutInfo.pending_cuts_count;

    return order;

  }

  async getCutInfo(order) {
    if (!order.cut_frequency) {
      return {
        cut_status: CUT_STATUS.UP_TO_DATE,
        pending_cuts: [],
        pending_cuts_count: 0
      };
    }

    const cuts = await this.orderRepository.findCutsByOrderId(order.order_id);
    const startDate = order.order_creation_date;
    const referenceDate = new Date();

    return CutScheduleService.calculateCutInfo(
      startDate,
      order.cut_frequency,
      cuts.map(c => c.period_end_date),
      referenceDate
    );
  }
}