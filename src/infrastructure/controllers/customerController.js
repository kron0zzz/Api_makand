import CreateCustomer from "../../application/use-cases/customers/CreateCustomer.js";
import GetCustomerById from "../../application/use-cases/customers/GetCustomerById.js";
import GetCustomers from "../../application/use-cases/customers/GetCustomers.js";
import UpdateCustomer from "../../application/use-cases/customers/UpdateCustomer.js"
import DeleteCustomer from "../../application/use-cases/customers/DeleteCustomer.js"

import CustomerRepositoryMongo from "../repositories/CustomerRepositoryMongo.js";

const customerRepository = new CustomerRepositoryMongo();

export const createCustomer = async (req, res) => {
  try {
    const createCustomer = new CreateCustomer(customerRepository);
    const customer = await createCustomer.execute(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const getCustomers = new GetCustomers(customerRepository);
    const customers = await getCustomers.execute();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const getCustomerById = new GetCustomerById(customerRepository);
    const customer = await getCustomerById.execute(req.params.id);
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateCustomer = async (req, res) => {
    try {
        const updateCustomer = new UpdateCustomer(customerRepository);
        const updatedCustomer = await updateCustomer.execute(req.params.id, req.body);

        if (!updatedCustomer) {
          console.log("no pai, no encontré el id")
            // Si el resultado es null, significa que el ID no se encontró
          return res.status(404).json({ error: "Cliente no encontrado" });
            
        }

        // Si se actualizó correctamente, respondemos con el objeto actualizado
        res.status(200).json(updatedCustomer);
    } catch (err) {
        // Si da error, mensaje 500
        res.status(500).json({ error: err.message });
    }
};

//Implementar el Delete

export const deleteCustomer = async (req, res) => {
    try {


        const deleteCustomer = new DeleteCustomer(customerRepository);
        const deleted = await deleteCustomer.execute(req.params.id);

        if (!deleted) {
          console.log("no se pudo eliminar")
            // Si la compra no se encontró, responde con 404
          return res.status(404).json({ message: "Cliente no encontrado o ya eliminado" });
        }
        
        // Si la eliminación fue exitosa, responde con 204 No Content
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};