import OrderRepository from "../../../infrastructure/repositories/OrderRepository.js";
import RentalCutRepository from "../../../infrastructure/repositories/RentalCutRepository.js";
import PaymentRepository from "../../../infrastructure/repositories/PaymentRepository.js";
import AdditionalChargeRepository from "../../../infrastructure/repositories/AdditionalChargeRepository.js";
import { generateInvoiceSheetPdf } from "../../../infrastructure/pdf/generators/InvoiceSheetGenerator.js";

export default class GetOrderInvoicePdf {
  constructor(
    orderRepository,
    rentalCutRepository,
    paymentRepository,
    additionalChargeRepository
  ) {
    this.orderRepository = orderRepository;
    this.rentalCutRepository = rentalCutRepository;
    this.paymentRepository = paymentRepository;
    this.additionalChargeRepository = additionalChargeRepository;
  }

  async execute(orderId, cutStartId, cutEndId) {
    const order = await this.orderRepository.findFullById(orderId);

    if (!order) {
      const error = new Error("Pedido no encontrado");
      error.statusCode = 404;
      throw error;
    }

    // Get order details to calculate machinery info
    const orderDetails = await this.orderRepository.findDetailsByOrderId(orderId);

    // Calculate machinery info from order details
    const totalMachineryCount = orderDetails.length;
    const totalUnits = orderDetails.reduce((sum, d) => sum + Number(d.quantity_to_dispatch || 0), 0);
    const totalWeight = orderDetails.reduce((sum, d) => sum + Number(d.subtotal_weight_kg || 0), 0);

    // Get all cuts for this order
    const allCuts = await this.rentalCutRepository.findByOrderId(orderId);

    if (allCuts.length === 0) {
      const error = new Error("No hay cortes registrados para este pedido");
      error.statusCode = 400;
      throw error;
    }

    const getDateParts = (value) => {
      if (!value) return null;
      if (value instanceof Date) {
        return {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate(),
        };
      }
      const dateParts = String(value).split("T")[0].split("-");
      if (dateParts.length !== 3) return null;
      const [year, month, day] = dateParts;
      return { year: Number(year), month: Number(month), day: Number(day) };
    };

    const getDateKey = (value) => {
      const parts = getDateParts(value);
      if (!parts) return "";
      return `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
    };

    const compareDates = (a, b) => getDateKey(a).localeCompare(getDateKey(b));

    const sortedCuts = [...allCuts].sort(
      (a, b) => compareDates(a.period_end_date, b.period_end_date) || Number(a.cut_id) - Number(b.cut_id)
    );

    const startIndex = sortedCuts.findIndex(
      (cut) => Number(cut.cut_id) === Number(cutStartId)
    );
    const endIndex = sortedCuts.findIndex(
      (cut) => Number(cut.cut_id) === Number(cutEndId)
    );

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      const error = new Error("Corte de inicio o fin no encontrado");
      error.statusCode = 400;
      throw error;
    }

    const cutsInRange = sortedCuts.slice(startIndex, endIndex + 1);
    const startCut = sortedCuts[startIndex];
    const endCut = sortedCuts[endIndex];

    // Get payments for this order
    const payments = await this.paymentRepository.findPaymentsByOrderId(orderId);

    // Get additional charges for this order
    const additionalCharges = await this.additionalChargeRepository.findByOrderId(orderId);
    const pendingCharges = await this.additionalChargeRepository.findPendingByOrderId(orderId);
    const pendingChargeIds = new Set(
      pendingCharges.map((charge) =>
        Number(charge.id ?? charge.additional_charge_id)
      )
    );
    const processedAdditionalCharges = additionalCharges.filter(
      (charge) => !pendingChargeIds.has(Number(charge.additional_charge_id))
    );

    const returnDatesById = new Map();
    const chargesWithReturnId = processedAdditionalCharges.filter(
      (charge) => charge.return_id
    );

    if (chargesWithReturnId.length > 0) {
      const workspaceData = await this.orderRepository.findWorkspaceData(orderId);
      for (const detail of workspaceData) {
        const returns = Array.isArray(detail.returns)
          ? detail.returns
          : JSON.parse(detail.returns || "[]");
        for (const returnRecord of returns) {
          returnDatesById.set(
            Number(returnRecord.return_id),
            returnRecord.return_date
          );
        }
      }
    }

    const getChargeDate = (charge) => {
      if (charge.charge_date) return charge.charge_date;
      if (charge.return_id) {
        return returnDatesById.get(Number(charge.return_id));
      }
      return order.order_creation_date;
    };

    const formatCurrency = (value) => {
      const number = Number(value) || 0;
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
    };

    const formatCurrencyFromCents = (cents) => formatCurrency(cents / 100);

    const toCents = (value) => Math.round((Number(value) || 0) * 100);

    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const monthsShort = [
      "ene", "feb", "mar", "abr", "may", "jun",
      "jul", "ago", "sep", "oct", "nov", "dic"
    ];

    const formatDate = (dateStr) => {
      const parts = getDateParts(dateStr);
      if (!parts) return "";
      return `${String(parts.day).padStart(2, "0")} de ${monthsShort[parts.month - 1]} de ${parts.year}`;
    };

    const formatDateLong = (dateStr) => {
      const parts = getDateParts(dateStr);
      if (!parts) return "";
      return `${String(parts.day).padStart(2, "0")} de ${months[parts.month - 1]} de ${parts.year}`;
    };

    const activePayments = payments
      .filter((payment) => !payment.is_cancelled)
      .sort(
        (a, b) =>
          compareDates(a.payment_date, b.payment_date) ||
          Number(a.payment_id) - Number(b.payment_id)
      );

    const cutRemainingCents = new Map(
      sortedCuts.map((cut) => [Number(cut.cut_id), toCents(cut.cut_amount)])
    );
    const cutAllocatedCents = new Map(
      sortedCuts.map((cut) => [Number(cut.cut_id), 0])
    );
    const paymentAllocations = activePayments.map((payment) => ({
      payment,
      remainingCents: toCents(payment.payment_amount),
      appliedByCut: new Map(),
    }));

    for (const allocation of paymentAllocations) {
      for (const cut of sortedCuts) {
        if (allocation.remainingCents <= 0) break;

        const cutId = Number(cut.cut_id);
        const remainingForCut = cutRemainingCents.get(cutId) || 0;
        const appliedCents = Math.min(
          allocation.remainingCents,
          remainingForCut
        );

        if (appliedCents > 0) {
          allocation.appliedByCut.set(cutId, appliedCents);
          allocation.remainingCents -= appliedCents;
          cutRemainingCents.set(cutId, remainingForCut - appliedCents);
          cutAllocatedCents.set(
            cutId,
            (cutAllocatedCents.get(cutId) || 0) + appliedCents
          );
        }
      }
    }

    const totalAmountCents = cutsInRange.reduce(
      (sum, cut) => sum + toCents(cut.cut_amount),
      0
    );
    const totalPaidInRangeCents = cutsInRange.reduce(
      (sum, cut) =>
        sum + (cutAllocatedCents.get(Number(cut.cut_id)) || 0),
      0
    );
    const pendingBalanceCents = Math.max(
      totalAmountCents - totalPaidInRangeCents,
      0
    );
    const grandTotalCents = totalAmountCents;

    // Prepare cuts data for template
    const cutsData = cutsInRange.map((cut) => ({
      cut_number: cut.cut_id,
      period_start: formatDate(cut.period_start_date),
      period_end: formatDate(cut.period_end_date),
      cut_date: formatDate(cut.cut_date),
      machinery_count: totalMachineryCount,
      units_count: totalUnits,
      total_weight: totalWeight.toLocaleString(),
      cut_amount: formatCurrencyFromCents(toCents(cut.cut_amount)),
    }));

    // Prepare payments applied to the selected range
    const paymentsData = paymentAllocations
      .map((allocation) => {
        const { payment, appliedByCut } = allocation;
        const appliedInRangeCents = cutsInRange.reduce(
          (sum, cut) =>
            sum + (appliedByCut.get(Number(cut.cut_id)) || 0),
          0
        );

        if (appliedInRangeCents <= 0) return null;

        const appliedCutIds = cutsInRange
          .filter(
            (cut) => (appliedByCut.get(Number(cut.cut_id)) || 0) > 0
          )
          .map((cut) => cut.cut_id);

        return {
          payment_id: payment.payment_id,
          payment_date: formatDate(payment.payment_date),
          payment_type: payment.payment_in_cash ? "Efectivo" : "Transferencia",
          payment_amount: formatCurrencyFromCents(appliedInRangeCents),
          payment_original_amount: formatCurrencyFromCents(
            toCents(payment.payment_amount)
          ),
          cut_reference: appliedCutIds.join(", "),
        };
      })
      .filter(Boolean);

    // Prepare additional charges data. Processed charges are already included
    // in the cut amounts generated by CreateRentalCut.
    const additionalChargesInRange = processedAdditionalCharges
      .map((charge) => {
        const chargeDate = getChargeDate(charge);
        const chargeDateKey = getDateKey(chargeDate);
        const matchedCuts = cutsInRange.filter((cut) => {
          const startKey = getDateKey(cut.period_start_date);
          const endKey = getDateKey(cut.period_end_date);
          return (
            chargeDateKey &&
            startKey &&
            endKey &&
            chargeDateKey >= startKey &&
            chargeDateKey <= endKey
          );
        });

        return { charge, chargeDate, matchedCuts };
      })
      .filter(({ matchedCuts }) => matchedCuts.length > 0);

    const totalAdditionalChargesCents = additionalChargesInRange.reduce(
      (sum, { charge }) => sum + toCents(charge.charge_amount),
      0
    );
    const totalCutAmountCents = totalAmountCents - totalAdditionalChargesCents;
    const additionalChargesData = additionalChargesInRange.map(
      ({ charge, chargeDate, matchedCuts }) => ({
        charge_id: charge.additional_charge_id,
        charge_type: charge.charge_type_name || "N/A",
        charge_description: charge.charge_description || "-",
        charge_date: formatDate(chargeDate),
        cut_reference: matchedCuts.map((cut) => cut.cut_id).join(", "),
        charge_amount: formatCurrencyFromCents(toCents(charge.charge_amount)),
      })
    );

    const data = {
      order_id: order.order_id,
      customer_name: order.customer_name,
      project_name: order.project_name,
      project_city: order.project_city,
      project_address: order.project_address,
      cut_frequency: order.cut_frequency,
      order_creation_date: formatDateLong(order.order_creation_date),
      order_closing_date: order.order_closing_date ? formatDateLong(order.order_closing_date) : "Pedido vigente",
      cut_start: startCut.cut_id,
      cut_start_date: formatDate(startCut.period_start_date),
      cut_end: endCut.cut_id,
      cut_end_date: formatDate(endCut.period_end_date),
      total_cuts_included: cutsInRange.length,
      cuts: cutsData,
      payments: paymentsData,
      additional_charges: additionalChargesData,
      total_amount: formatCurrencyFromCents(totalCutAmountCents),
      total_paid: formatCurrencyFromCents(totalPaidInRangeCents),
      total_additional_charges: formatCurrencyFromCents(totalAdditionalChargesCents),
      grand_total: formatCurrencyFromCents(grandTotalCents),
      pending_balance: formatCurrencyFromCents(pendingBalanceCents),
      generated_at: new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return generateInvoiceSheetPdf(data);
  }
}