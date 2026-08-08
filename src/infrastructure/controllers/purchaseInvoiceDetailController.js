// src/infrastructure/controllers/purchaseInvoiceDetailController.js
import CreatePurchaseInvoiceDetail from "../../application/use-cases/purchase_invoice_details/CreatePurchaseInvoiceDetail.js";
import GetPurchaseInvoiceDetails from "../../application/use-cases/purchase_invoice_details/GetPurchaseInvoiceDetails.js";
import GetPurchaseInvoiceDetailById from "../../application/use-cases/purchase_invoice_details/GetPurchaseInvoiceDetailById.js";
import UpdatePurchaseInvoiceDetail from "../../application/use-cases/purchase_invoice_details/UpdatePurchaseInvoiceDetail.js";
import DeletePurchaseInvoiceDetail from "../../application/use-cases/purchase_invoice_details/DeletePurchaseInvoiceDetail.js";
import GetPurchaseInvoiceDetailsTable from "../../application/use-cases/purchase_invoice_details/GetPurchaseInvoiceDetailsTable.js";
import PurchaseInvoiceDetailRepository from "../repositories/PurchaseInvoiceDetailRepository.js";

const purchaseInvoiceDetailRepository = new PurchaseInvoiceDetailRepository();

export const createPurchaseInvoiceDetail = async (req, res) => {
  try {
    const useCase = new CreatePurchaseInvoiceDetail(purchaseInvoiceDetailRepository);
    const detail = await useCase.execute(req.body);
    res.status(201).json(detail);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "La factura (invoice_id) o la maquinaria (machinery_id) especificada no existe." });
    }
    res.status(500).json({ error: err.message });
  }
};

export const getPurchaseInvoiceDetails = async (req, res) => {
  try {
    const useCase = new GetPurchaseInvoiceDetails(purchaseInvoiceDetailRepository);
    const details = await useCase.execute();
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPurchaseInvoiceDetailById = async (req, res) => {
  try {
    const useCase = new GetPurchaseInvoiceDetailById(purchaseInvoiceDetailRepository);
    const id = parseInt(req.params.id, 10);
    const detail = await useCase.execute(id);

    if (!detail) {
      return res.status(404).json({ error: "Detalle de factura de compra no encontrado" });
    }
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePurchaseInvoiceDetail = async (req, res) => {
  try {
    const useCase = new UpdatePurchaseInvoiceDetail(purchaseInvoiceDetailRepository);
    const id = parseInt(req.params.id, 10);
    const updated = await useCase.execute(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Detalle no encontrado para actualizar" });
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({ error: "La factura o maquinaria especificada no es válida." });
    }
    res.status(500).json({ error: err.message });
  }
};

export const deletePurchaseInvoiceDetail = async (req, res) => {
  try {
    const useCase = new DeletePurchaseInvoiceDetail(purchaseInvoiceDetailRepository);
    const id = parseInt(req.params.id, 10);
    const deleted = await useCase.execute(id);

    if (!deleted) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPurchaseInvoiceDetailsTable = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const useCase = new GetPurchaseInvoiceDetailsTable(purchaseInvoiceDetailRepository);
    const tableData = await useCase.execute(page, limit, search);
    res.status(200).json(tableData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
