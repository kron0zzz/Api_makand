import CreateSupplier from "../../application/use-cases/suppliers/CreateSupplier.js";
import GetSuppliers from "../../application/use-cases/suppliers/GetSuppliers.js";
import GetSupplierById from "../../application/use-cases/suppliers/GetSupplierById.js";
import UpdateSupplier from "../../application/use-cases/suppliers/UpdateSupplier.js";
import DeleteSupplier from "../../application/use-cases/suppliers/DeleteSupplier.js";

import SupplierRepositoryPrisma from "../repositories/SupplierRepositoryPrisma.js";

const supplierRepository = new SupplierRepositoryPrisma();

export const createSupplier = async (req, res) => {
  try {
    const createSupplier =
      new CreateSupplier(supplierRepository);

    const supplier = await createSupplier.execute(
      req.body
    );

    res.status(201).json(supplier);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const getSuppliers =
      new GetSuppliers(supplierRepository);

    const suppliers = await getSuppliers.execute();

    res.status(200).json(suppliers);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const getSupplierById =
      new GetSupplierById(supplierRepository);

    const supplier =
      await getSupplierById.execute(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        error: "Proveedor no encontrado"
      });
    }

    res.status(200).json(supplier);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const updateSupplier =
      new UpdateSupplier(supplierRepository);

    const updatedSupplier =
      await updateSupplier.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedSupplier);

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Proveedor no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const deleteSupplier =
      new DeleteSupplier(supplierRepository);

    await deleteSupplier.execute(req.params.id);

    res.status(204).send();

  } catch (err) {

    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Proveedor no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};