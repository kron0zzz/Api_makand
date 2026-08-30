import CreateOrder from "../../application/use-cases/orders/CreateOrder.js";
import GetOrders from "../../application/use-cases/orders/GetOrders.js";
import GetOrderById from "../../application/use-cases/orders/GetOrderById.js";
import UpdateOrder from "../../application/use-cases/orders/UpdateOrder.js";
import DeleteOrder from "../../application/use-cases/orders/DeleteOrder.js";
import GetOrdersTable from "../../application/use-cases/orders/GetOrdersTable.js";
import CreateCompleteOrder from "../../application/use-cases/orders/CreateCompleteOrder.js";
import GetOrderFull from "../../application/use-cases/orders/GetOrderFull.js"
import GetOrderWorkspace from "../../application/use-cases/orders/GetOrderWorkspace.js";
import CancelOrder from "../../application/use-cases/orders/CancelOrder.js";
import CloseOrder from "../../application/use-cases/orders/CloseOrder.js";

import OrderDetailRepository from "../repositories/Order_detailRepository.js";
import MachineryRepository from "../repositories/MachineryRepository.js";
import MachineryStockRepository from "../repositories/machineryStockRepository.js";
import OrderRepository from "../repositories/OrderRepository.js";
import PaymentRepository from "../repositories/PaymentRepository.js";
import RentalCutRepository from "../repositories/RentalCutRepository.js";
import ReturnRepository from "../repositories/ReturnRepository.js";
import AdditionalChargeRepository from "../repositories/AdditionalChargeRepository.js";

const orderRepository = new OrderRepository();
const orderDetailRepository = new OrderDetailRepository();
const machineryRepository = new MachineryRepository();
const machineryStockRepository = new MachineryStockRepository();
const paymentRepository = new PaymentRepository();
const rentalCutRepository = new RentalCutRepository();
const returnRepository = new ReturnRepository();
const getOrderWorkspaceUseCase = new GetOrderWorkspace(orderRepository);
const additionalChargeRepository = new AdditionalChargeRepository();

export const createOrder = async (req, res, next) => {
  try {
    const createOrder =
      new CreateOrder(orderRepository);

    const order = await createOrder.execute(
      req.body,
      req.user
    );

    res.status(201).json(order);

  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const getOrders =
      new GetOrders(orderRepository);

    const orders = await getOrders.execute();

    res.status(200).json(orders);

  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const getOrderById =
      new GetOrderById(orderRepository);

    const order =
      await getOrderById.execute(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Pedido no encontrado"
      });
    }

    res.status(200).json(order);

  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updateOrder =
      new UpdateOrder(orderRepository);

    const updatedOrder =
      await updateOrder.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedOrder);

  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrder =
      new DeleteOrder(orderRepository);

    await deleteOrder.execute(req.params.id);

    res.status(204).send();

  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const cancelOrderUseCase =
      new CancelOrder(
        orderRepository,
        orderDetailRepository,
        machineryStockRepository,
        paymentRepository,
        rentalCutRepository,
        returnRepository
      );

    const cancelledOrder =
      await cancelOrderUseCase.execute(
        req.params.id
      );

    res.status(200).json(cancelledOrder);

  } catch (err) {
    next(err);
  }
};

export const closeOrder = async (req, res, next) => {
  try {
    const closeOrderUseCase =
      new CloseOrder(
        orderRepository,
        orderDetailRepository,
        rentalCutRepository,
        paymentRepository,
        returnRepository
      );

    const closedOrder =
      await closeOrderUseCase.execute(
        req.params.id
      );

    res.status(200).json({
      message: "Pedido cerrado correctamente."
    });

  } catch (err) {
    next(err);
  }
};

export const getOrdersTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getOrdersTable = new GetOrdersTable(orderRepository);
    const orders = await getOrdersTable.execute(page, limit, search);
    res.status(200).json(orders);

  } catch (err) {
    next(err);
  }
};



export const createCompleteOrder = async (req, res, next) => {

  try {

    const createCompleteOrder =
      new CreateCompleteOrder(
        orderRepository,
        orderDetailRepository,
        machineryStockRepository,
        additionalChargeRepository
      );

    const order =
      await createCompleteOrder.execute(
        req.body,
        req.user
      );

    res.status(201).json(order);

  } catch (err) {
    next(err);
  }
};

export const getOrderFull = async (req, res, next) => {

  try {

    const getOrderFull =
      new GetOrderFull(
        orderRepository
      );

    const order =
      await getOrderFull.execute(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        error:
          "Pedido no encontrado"
      });

    }

    res.status(200).json(order);

  } catch (err) {
    next(err);
  }
};


export const getOrderWorkspace = async (req, res, next) => {
  try {
    const workspace = await getOrderWorkspaceUseCase.execute(req.params.id);
    res.status(200).json(workspace);
  } catch (err) {
    next(err);
  }

};
