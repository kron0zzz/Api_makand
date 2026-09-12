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

    // Find the start and end cuts by their IDs
    const startCut = allCuts.find(c => c.cut_id === cutStartId);
    const endCut = allCuts.find(c => c.cut_id === cutEndId);

    if (!startCut || !endCut) {
      const error = new Error("Corte de inicio o fin no encontrado");
      error.statusCode = 400;
      throw error;
    }

    // Filter cuts within the range (inclusive)
    const cutsInRange = allCuts.filter(c => {
      const cutDate = new Date(c.period_end_date);
      const startDate = new Date(startCut.period_end_date);
      const endDate = new Date(endCut.period_end_date);
      return cutDate >= startDate && cutDate <= endDate;
    }).sort((a, b) => new Date(a.period_start_date) - new Date(b.period_start_date));

    // Get payments for this order
    const payments = await this.paymentRepository.findPaymentsByOrderId(orderId);

    // Get additional charges for this order
    const additionalCharges = await this.additionalChargeRepository.findByOrderId(orderId);

    const formatCurrency = (value) => {
      const number = Number(value) || 0;
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const formatDateLong = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Calculate totals
    const totalAmount = cutsInRange.reduce((sum, c) => sum + Number(c.cut_amount), 0);
    const totalPaid = payments.filter(p => !p.is_cancelled).reduce((sum, p) => sum + Number(p.payment_amount), 0);
    const totalAdditionalCharges = additionalCharges.reduce((sum, c) => sum + Number(c.charge_amount), 0);
    const grandTotal = totalAmount + totalAdditionalCharges;
    const pendingBalance = grandTotal - totalPaid;

    // Prepare cuts data for template
    const cutsData = cutsInRange.map((cut, index) => ({
      cut_number: cut.cut_id,
      period_start: formatDate(cut.period_start_date),
      period_end: formatDate(cut.period_end_date),
      cut_date: formatDate(cut.cut_date),
      machinery_count: totalMachineryCount,
      units_count: totalUnits,
      total_weight: totalWeight.toLocaleString(),
      cut_amount: formatCurrency(cut.cut_amount),
    }));

    // Prepare payments data
    const paymentsData = payments.filter(p => !p.is_cancelled).map(payment => ({
      payment_id: payment.payment_id,
      payment_date: formatDate(payment.payment_date),
      payment_type: payment.payment_in_cash ? "Efectivo" : "Transferencia",
      cut_reference: "",
      payment_amount: formatCurrency(payment.payment_amount),
    }));

    // Prepare additional charges data
    const additionalChargesData = additionalCharges.map(charge => ({
      charge_id: charge.additional_charge_id,
      charge_type: charge.charge_type_name || "N/A",
      charge_description: charge.charge_description || "-",
      charge_amount: formatCurrency(charge.charge_amount),
    }));

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
      cut_start_date: formatDate(startCut.period_end_date),
      cut_end: endCut.cut_id,
      cut_end_date: formatDate(endCut.period_end_date),
      total_cuts_included: cutsInRange.length,
      cuts: cutsData,
      payments: paymentsData,
      additional_charges: additionalChargesData,
      total_amount: formatCurrency(totalAmount),
      total_paid: formatCurrency(totalPaid),
      total_additional_charges: formatCurrency(totalAdditionalCharges),
      grand_total: formatCurrency(grandTotal),
      pending_balance: formatCurrency(pendingBalance),
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