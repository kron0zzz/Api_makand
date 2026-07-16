import CreateEmployee from "../../application/use-cases/employees/CreateEmployee.js";
import GetEmployees from "../../application/use-cases/employees/GetEmployees.js";
import GetEmployeeById from "../../application/use-cases/employees/GetEmployeeById.js";
import UpdateEmployee from "../../application/use-cases/employees/UpdateEmployee.js";
import DeleteEmployee from "../../application/use-cases/employees/DeleteEmployee.js";
import GetEmployeesTable from "../../application/use-cases/employees/GetEmployeesTable.js";

import EmployeeRepository from "../repositories/EmployeeRepository.js";

const employeeRepository = new EmployeeRepository();

export const createEmployee = async (req, res) => {
  try {
    const createEmployeeUseCase = new CreateEmployee(employeeRepository);
    const employee = await createEmployeeUseCase.execute(req.body);
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        error: "El número de documento o correo electrónico ya está registrado."
      });
    }
    if (err.code === "23503") {
      return res.status(400).json({
        error: "El cargo (position_id) especificado no existe."
      });
    }
    res.status(500).json({ error: err.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const getEmployeesUseCase = new GetEmployees(employeeRepository);
    const employees = await getEmployeesUseCase.execute();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const getEmployeeByIdUseCase = new GetEmployeeById(employeeRepository);
    
    // Convertimos el ID a número entero
    const employeeId = parseInt(req.params.id, 10);
    const employee = await getEmployeeByIdUseCase.execute(employeeId);

    if (!employee) {
      return res.status(404).json({
        error: "Empleado no encontrado"
      });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updateEmployeeUseCase = new UpdateEmployee(employeeRepository);
    
    // ¡AQUÍ ESTABA EL DETALLE! Convertimos el ID de la URL a entero
    const employeeId = parseInt(req.params.id, 10);
    
    const updatedEmployee = await updateEmployeeUseCase.execute(employeeId, req.body);

    if (!updatedEmployee) {
      return res.status(404).json({
        error: "Empleado no encontrado para actualizar"
      });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        error: "El número de documento o correo electrónico ya está en uso por otro empleado."
      });
    }
    if (err.code === "23503") {
      return res.status(400).json({
        error: "El cargo (position_id) especificado no es válido."
      });
    }
    res.status(500).json({ error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const deleteEmployeeUseCase = new DeleteEmployee(employeeRepository);
    
    // Convertimos el ID a número entero
    const employeeId = parseInt(req.params.id, 10);
    const deletedEmployee = await deleteEmployeeUseCase.execute(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({
        error: "Empleado no encontrado"
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeesTable = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getEmployeesTableUseCase = new GetEmployeesTable(employeeRepository);
    const employeesTable = await getEmployeesTableUseCase.execute(page, limit, search);
    res.status(200).json(employeesTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};