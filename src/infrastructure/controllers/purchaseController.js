import CreatePurchase from "../../application/use-cases/purchases/CreatePurchase.js";
import GetPurchaseById from "../../application/use-cases/purchases/GetPurchaseById.js";
import GetPurchases from "../../application/use-cases/purchases/GetPurchases.js";
import UpdatePurchase from "../../application/use-cases/purchases/UpdatePurchases.js"
import DeletePurchase from "../../application/use-cases/purchases/DeletePurchase.js"

import PurchaseRepositoryMongo from "../repositories/PurchaseRepositoryMongo.js";

const purchaseRepository = new PurchaseRepositoryMongo();

export const createPurchase = async (req, res) => {
  try {
    const createPurchase = new CreatePurchase(purchaseRepository);
    const purchase = await createPurchase.execute(req.body);
    res.status(201).json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const getPurchases = new GetPurchases(purchaseRepository);
    const purchases = await getPurchases.execute();
    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPurchaseById = async (req, res) => {
  try {
    const getPurchaseById = new GetPurchaseById(purchaseRepository);
    const purchase = await getPurchaseById.execute(req.params.id);
    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updatePurchase = async (req, res) => {
    try {
        const updatePurchase = new UpdatePurchase(purchaseRepository);
        const updatedPurchase = await updatePurchase.execute(req.params.id, req.body);

        if (!updatedPurchase) {
          console.log("no pai, no encontré el id")
            // Si el resultado es null, significa que el ID no se encontró
          return res.status(404).json({ error: "Compra no encontrada" });
            
        }

        // Si se actualizó correctamente, respondemos con el objeto actualizado
        res.status(200).json(updatedPurchase);
    } catch (err) {
        // Si da error, mensaje 500
        res.status(500).json({ error: err.message });
    }
};

//Implementar el Delete

export const deletePurchase = async (req, res) => {
    try {


        const deletePurchase = new DeletePurchase(purchaseRepository);
        const deleted = await deletePurchase.execute(req.params.id);

        if (!deleted) {
          console.log("no se pudo eliminar")
            // Si la compra no se encontró, responde con 404
          return res.status(404).json({ message: "Compra no encontrada o ya eliminada" });
        }
        
        // Si la eliminación fue exitosa, responde con 204 No Content
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};