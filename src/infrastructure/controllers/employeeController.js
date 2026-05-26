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
    // Código 23505 = Restricción UNIQUE violada en PostgreSQL (Documento o Email duplicado)
    if (err.code === "23505") {
      return res.status(400).json({
        error: "El número de documento o correo electrónico ya está registrado."
      });
    }
    // Código 23503 = Restricción de Llave Foránea violada (Si el position_id no existe en positions)
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
    const employee = await getEmployeeByIdUseCase.execute(req.params.id);

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
    const updatedEmployee = await updateEmployeeUseCase.execute(req.params.id, req.body);

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
    const deletedEmployee = await deleteEmployeeUseCase.execute(req.params.id);

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
    const getEmployeesTableUseCase = new GetEmployeesTable(employeeRepository);
    const employeesTable = await getEmployeesTableUseCase.execute();
    res.status(200).json(employeesTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};