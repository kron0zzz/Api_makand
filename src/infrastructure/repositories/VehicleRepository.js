import pool from "../../config/database.js";

export default class VehicleRepository {
  async create(vehicleData) {
    const { vehicle_status, vehicle_brand, vehicle_model, license_plate, capacity_kg } = vehicleData;

    const query = `
      INSERT INTO vehicles (vehicle_status, vehicle_brand, vehicle_model, license_plate, capacity_kg)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [vehicle_status, vehicle_brand, vehicle_model, license_plate, capacity_kg];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM vehicles");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM vehicles WHERE vehicle_id = $1",
      [id]
    );

    return result.rows[0];
  }

  async update(id, vehicleData) {
    const { vehicle_status, vehicle_brand, vehicle_model, license_plate, capacity_kg } = vehicleData;

    const query = `
      UPDATE vehicles
      SET vehicle_status = $1,
          vehicle_brand = $2,
          vehicle_model = $3,
          license_plate = $4,
          capacity_kg = $5
      WHERE vehicle_id = $6
      RETURNING *
    `;

    const values = [vehicle_status, vehicle_brand, vehicle_model, license_plate, capacity_kg, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }
}
