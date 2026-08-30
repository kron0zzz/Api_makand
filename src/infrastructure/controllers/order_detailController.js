import CreateOrder_detail from "../../application/use-cases/order_detail/CreateOrder_detail.js";
import GetOrder_details from "../../application/use-cases/order_detail/GetOrder_details.js";
import GetOrder_detailById from "../../application/use-cases/order_detail/GetOrder_detailById.js";
import UpdateOrder_detail from "../../application/use-cases/order_detail/UpdateOrder_detail.js";
import DeleteOrder_detail from "../../application/use-cases/order_detail/DeleteOrder_detail.js";
import GetOrder_detailsTable from "../../application/use-cases/order_detail/GetOrder_detailsTable.js";

import Order_detailRepository from "../repositories/Order_detailRepository.js";

const order_detailRepository = new Order_detailRepository();

export const createOrder_detail = async (req, res, next) => {
  try {
    const createOrder_detail =
      new CreateOrder_detail(order_detailRepository);

    const order_detail = await createOrder_detail.execute(
      req.body
    );

    res.status(201).json(order_detail);

  } catch (err) {
    next(err);
  }
};

export const getOrder_details = async (req, res, next) => {
  try {
    const getOrder_details =
      new GetOrder_details(order_detailRepository);

    const order_details = await getOrder_details.execute();

    res.status(200).json(order_details);

  } catch (err) {
    next(err);
  }
};

export const getOrder_detailById = async (req, res, next) => {
  try {
    const getOrder_detailById =
      new GetOrder_detailById(order_detailRepository);

    const order_detail =
      await getOrder_detailById.execute(req.params.id);

    if (!order_detail) {
      return res.status(404).json({
        error: "Detalle de pedido no encontrado"
      });
    }

    res.status(200).json(order_detail);

  } catch (err) {
    next(err);
  }
};

export const updateOrder_detail = async (req, res, next) => {
  try {
    const updateOrder_detail =
      new UpdateOrder_detail(order_detailRepository);

    const updatedOrder_detail =
      await updateOrder_detail.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedOrder_detail);

  } catch (err) {
    next(err);
  }
};

export const deleteOrder_detail = async (req, res, next) => {
  try {
    const deleteOrder_detail =
      new DeleteOrder_detail(order_detailRepository);

    await deleteOrder_detail.execute(req.params.id);

    res.status(204).send();

  } catch (err) {
    next(err);
  }
};

export const getOrder_detailsTable = async (req, res, next) => {
  try {
    const getOrder_detailsTable =
      new GetOrder_detailsTable(order_detailRepository);

    const order_details = await getOrder_detailsTable.execute();

    res.status(200).json(order_details);

  } catch (err) {
    next(err);
  }
};
