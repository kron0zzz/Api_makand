import CreateOrder from "../../application/use-cases/orders/CreateOrder.js";
import GetOrders from "../../application/use-cases/orders/GetOrders.js";
import GetOrderById from "../../application/use-cases/orders/GetOrderById.js";
import UpdateOrder from "../../application/use-cases/orders/UpdateOrder.js";
import DeleteOrder from "../../application/use-cases/orders/DeleteOrder.js";
import GetOrdersTable from "../../application/use-cases/orders/GetOrdersTable.js";
import CreateCompleteOrder from "../../application/use-cases/orders/CreateCompleteOrder.js";
import GetOrderFull from "../../application/use-cases/orders/GetOrderFull.js"

import OrderDetailRepository from "../repositories/Order_detailRepository.js";
import MachineryRepository from "../repositories/MachineryRepository.js";

import OrderRepository from "../repositories/OrderRepository.js";

const orderRepository = new OrderRepository();
const orderDetailRepository = new OrderDetailRepository();
const machineryRepository = new MachineryRepository();

export const createOrder = async (req, res) => {
  try {
    const createOrder =
      new CreateOrder(orderRepository);

    const order = await createOrder.execute(
      req.body,
      req.user
    );

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const getOrders =
      new GetOrders(orderRepository);

    const orders = await getOrders.execute();

    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getOrderById = async (req, res) => {
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
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateOrder = async (req, res) => {
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

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Pedido no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleteOrder =
      new DeleteOrder(orderRepository);

    await deleteOrder.execute(req.params.id);

    res.status(204).send();

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Pedido no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const getOrdersTable = async (req, res) => {
  try {
    const getOrdersTable =
      new GetOrdersTable(orderRepository);

    const orders = await getOrdersTable.execute();

    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};



export const createCompleteOrder = async (req, res) => {

  try {

    const createCompleteOrder =
      new CreateCompleteOrder(
        orderRepository,
        orderDetailRepository,
        machineryRepository
      );

    const order =
      await createCompleteOrder.execute(
        req.body,
        req.user
      );

    res.status(201).json(order);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};





export const getOrderFull = async (req, res) => {

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

    res.status(500).json({
      error: err.message
    });

  }

};