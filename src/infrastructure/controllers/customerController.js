import CreateCustomer from "../../application/use-cases/customers/CreateCustomer.js";
import GetCustomers from "../../application/use-cases/customers/GetCustomers.js";
import GetCustomerById from "../../application/use-cases/customers/GetCustomerById.js";
import UpdateCustomer from "../../application/use-cases/customers/UpdateCustomer.js";
import DeleteCustomer from "../../application/use-cases/customers/DeleteCustomer.js";
import GetCustomersTable from "../../application/use-cases/customers/GetCustomersTable.js"

import CustomerRepositoryPrisma from "../repositories/CustomerRepositoryPrisma.js";
const customerRepository = new CustomerRepositoryPrisma();

export const createCustomer = async (req, res) => {
  try {
    const createCustomerUseCase = new CreateCustomer(customerRepository);

    // Los datos vendrán según tu tabla: client_document_type, client_document_number, etc.
    const customer = await createCustomerUseCase.execute(req.body);

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const getCustomersUseCase = new GetCustomers(customerRepository);

    const customers = await getCustomersUseCase.execute();

    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const getCustomerByIdUseCase = new GetCustomerById(customerRepository);

    const customer = await getCustomerByIdUseCase.execute(req.params.id);

    if (!customer) {
      return res.status(404).json({
        error: "Cliente no encontrado"
      });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updateCustomerUseCase = new UpdateCustomer(customerRepository);

    const updatedCustomer = await updateCustomerUseCase.execute(
      req.params.id,
      req.body
    );

    res.status(200).json(updatedCustomer);
  } catch (err) {
    // P2025 es un error específico de Prisma cuando no encuentra el registro
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Cliente no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deleteCustomerUseCase = new DeleteCustomer(customerRepository);

    await deleteCustomerUseCase.execute(req.params.id);

    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Cliente no encontrado"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};



export const getCustomersTable = async (req, res) => {
  try {
    const getCustomersTable =
      new GetCustomersTable(customerRepository);

    const customers = await getCustomersTable.execute();

    res.status(200).json(customers);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};