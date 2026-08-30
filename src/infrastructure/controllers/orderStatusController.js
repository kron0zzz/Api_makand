import CreateOrderStatus from "../../application/use-cases/orderStatus/CreateOrderStatus.js";
import GetOrderStatuss from "../../application/use-cases/orderStatus/GetOrderStatuss.js";
import GetOrderStatussTable from "../../application/use-cases/orderStatus/GetOrderStatussTable.js";
import GetOrderStatusById from "../../application/use-cases/orderStatus/GetOrderStatusById.js";
import UpdateOrderStatus from "../../application/use-cases/orderStatus/UpdateOrderStatus.js";
import DeleteOrderStatus from "../../application/use-cases/orderStatus/DeleteOrderStatus.js";

import OrderStatusRepositoryPrisma from "../repositories/OrderStatusRepositoryPrisma.js";

const orderStatusRepository = new OrderStatusRepositoryPrisma();

export const createOrderStatus = async (req, res, next) => {
  try {
    const createOrderStatusUseCase = new CreateOrderStatus(orderStatusRepository);
    const orderStatus = await createOrderStatusUseCase.execute(req.body);
    res.status(201).json(orderStatus);
  } catch (err) {
    next(err);
  }
};

export const getOrderStatuss = async (req, res, next) => {
  try {
    const getOrderStatussUseCase = new GetOrderStatuss(orderStatusRepository);
    const orderStatuss = await getOrderStatussUseCase.execute();
    res.status(200).json(orderStatuss);
  } catch (err) {
    next(err);
  }
};

export const getOrderStatussTable = async (req, res, next) => {
  try {
    const getOrderStatussTableUseCase = new GetOrderStatussTable(orderStatusRepository);
    const orderStatuss = await getOrderStatussTableUseCase.execute();
    res.status(200).json(orderStatuss);
  } catch (err) {
    next(err);
  }
};

export const getOrderStatusById = async (req, res, next) => {
  try {
    const getOrderStatusByIdUseCase = new GetOrderStatusById(orderStatusRepository);
    const orderStatus = await getOrderStatusByIdUseCase.execute(req.params.id);

    if (!orderStatus) {
      return res.status(404).json({ error: "Estado de pedido no encontrado" });
    }

    res.status(200).json(orderStatus);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const updateOrderStatusUseCase = new UpdateOrderStatus(orderStatusRepository);
    const updatedOrderStatus = await updateOrderStatusUseCase.execute(
      req.params.id,
      req.body
    );

    if (!updatedOrderStatus) {
      return res.status(404).json({ error: "No se encontró el estado de pedido para actualizar" });
    }

    res.status(200).json(updatedOrderStatus);
  } catch (err) {
    next(err);
  }
};

export const deleteOrderStatus = async (req, res, next) => {
  try {
    const deleteOrderStatusUseCase = new DeleteOrderStatus(orderStatusRepository);
    const deletedOrderStatus = await deleteOrderStatusUseCase.execute(req.params.id);

    if (!deletedOrderStatus) {
      return res.status(404).json({ error: "No se encontró el estado de pedido para eliminar" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
