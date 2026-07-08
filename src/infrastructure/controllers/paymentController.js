import CreatePayment from "../../application/use-cases/payments/CreatePayment.js";
import GetPayments from "../../application/use-cases/payments/GetPayments.js";
import GetPaymentById from "../../application/use-cases/payments/GetPaymentById.js";
import UpdatePayment from "../../application/use-cases/payments/UpdatePayment.js";
import DeletePayment from "../../application/use-cases/payments/DeletePayment.js";
import GetPaymentsTable from "../../application/use-cases/payments/GetPaymentsTable.js";
import GetPaymentsByOrderId from "../../application/use-cases/payments/GetPaymentsByOrderId.js";
import GetOrderBalance from "../../application/use-cases/orders/GetOrderBalance.js";

import PaymentRepository from "../repositories/PaymentRepository.js";
import OrderRepository from "../repositories/OrderRepository.js";
import RentalCutRepository from "../repositories/RentalCutRepository.js";

const paymentRepository = new PaymentRepository();
const orderRepository = new OrderRepository();
const rentalCutRepository = new RentalCutRepository();
const getOrderBalance = new GetOrderBalance(orderRepository, rentalCutRepository, paymentRepository);

export const createPayment = async (req, res) => {
  try {
    const createPayment = new CreatePayment(paymentRepository, orderRepository, getOrderBalance);
    const payment = await createPayment.execute(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getPayments = async (req, res) => {
  try {
    const getPayments =
      new GetPayments(paymentRepository);

    const payments = await getPayments.execute();

    res.status(200).json(payments);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const getPaymentById =
      new GetPaymentById(paymentRepository);

    const payment =
      await getPaymentById.execute(req.params.id);

    if (!payment) {
      return res.status(404).json({
        error: "Abono no encontrado"
      });
    }

    res.status(200).json(payment);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const updatePayment =
      new UpdatePayment(paymentRepository);

    const updatedPayment =
      await updatePayment.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedPayment);

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Abono no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deletePayment =
      new DeletePayment(paymentRepository);

    await deletePayment.execute(req.params.id);

    res.status(204).send();

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Abono no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const getPaymentsTable = async (req, res) => {
  try {
    const getPaymentsTable =
      new GetPaymentsTable(paymentRepository);

    const payments = await getPaymentsTable.execute();

    res.status(200).json(payments);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getPaymentsByOrderId = async (req, res) => {
  try {
    const getPaymentsByOrderId = new GetPaymentsByOrderId(paymentRepository, rentalCutRepository);
    const paymentsOrder = await getPaymentsByOrderId.execute(req.params.id);
    res.status(200).json(paymentsOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};