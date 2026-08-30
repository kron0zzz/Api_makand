// src/infrastructure/controllers/purchaseInvoiceController.js
import CreatePurchaseInvoice from "../../application/use-cases/purchase_invoices/CreatePurchaseInvoice.js";
import CreatePurchaseComplete from "../../application/use-cases/purchase_invoices/CreatePurchaseComplete.js";
import GetPurchaseInvoices from "../../application/use-cases/purchase_invoices/GetPurchaseInvoices.js";
import GetPurchaseInvoiceById from "../../application/use-cases/purchase_invoices/GetPurchaseInvoiceById.js";
import UpdatePurchaseInvoice from "../../application/use-cases/purchase_invoices/UpdatePurchaseInvoice.js";
import DeletePurchaseInvoice from "../../application/use-cases/purchase_invoices/DeletePurchaseInvoice.js";
import GetPurchaseInvoicesTable from "../../application/use-cases/purchase_invoices/GetPurchaseInvoicesTable.js";
import PurchaseInvoiceRepository from "../repositories/PurchaseInvoiceRepository.js";
import PurchaseInvoiceDetailRepository from "../repositories/PurchaseInvoiceDetailRepository.js";
import MachineryRepository from "../repositories/MachineryRepository.js";
import MachineryStockRepository from "../repositories/machineryStockRepository.js";
import pool from "../../config/database.js";

const purchaseInvoiceRepository = new PurchaseInvoiceRepository();
const purchaseInvoiceDetailRepository = new PurchaseInvoiceDetailRepository();
const machineryRepository = new MachineryRepository();
const machineryStockRepository = new MachineryStockRepository();

export const createPurchaseInvoice = async (req, res, next) => {
  try {
    const useCase = new CreatePurchaseInvoice(purchaseInvoiceRepository);
    const invoice = await useCase.execute(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

export const createPurchaseComplete = async (req, res, next) => {
  try {
    const useCase = new CreatePurchaseComplete(
      purchaseInvoiceRepository,
      purchaseInvoiceDetailRepository,
      machineryRepository,
      machineryStockRepository,
      pool
    );
    const invoice = await useCase.execute(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

export const getPurchaseInvoices = async (req, res, next) => {
  try {
    const useCase = new GetPurchaseInvoices(purchaseInvoiceRepository);
    const invoices = await useCase.execute();
    res.status(200).json(invoices);
  } catch (err) {
    next(err);
  }
};

export const getPurchaseInvoiceById = async (req, res, next) => {
  try {
    const useCase = new GetPurchaseInvoiceById(purchaseInvoiceRepository);
    const id = parseInt(req.params.id, 10);
    const invoice = await useCase.execute(id);

    if (!invoice) {
      return res.status(404).json({ error: "Factura de compra no encontrada" });
    }
    res.status(200).json(invoice);
  } catch (err) {
    next(err);
  }
};

export const updatePurchaseInvoice = async (req, res, next) => {
  try {
    const useCase = new UpdatePurchaseInvoice(purchaseInvoiceRepository);
    const id = parseInt(req.params.id, 10);
    const updated = await useCase.execute(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Factura no encontrada para actualizar" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePurchaseInvoice = async (req, res, next) => {
  try {
    const useCase = new DeletePurchaseInvoice(purchaseInvoiceRepository);
    const id = parseInt(req.params.id, 10);
    const deleted = await useCase.execute(id);

    if (!deleted) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getPurchaseInvoicesTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const useCase = new GetPurchaseInvoicesTable(purchaseInvoiceRepository);
    const tableData = await useCase.execute(page, limit, search);
    res.status(200).json(tableData);
  } catch (err) {
    next(err);
  }
};
