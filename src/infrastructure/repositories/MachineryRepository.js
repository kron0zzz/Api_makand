import pool from "../../config/database.js";

export default class MachineryRepository {

  // 1. Crear una nueva maquinaria
  async create(machineryData) {
    if (!machineryData || Object.keys(machineryData).length === 0) {
      throw new Error("No se recibieron datos de la maquinaria en el repositorio.");
    }

    const {category_id, machinery_name, is_motorized, sale_price, daily_rental_price, weight_kg, machinery_description} = machineryData
    const query = `
      INSERT INTO machinery (
        category_id, 
        machinery_name, 
        is_motorized, 
        sale_price, 
        daily_rental_price, 
        weight_kg, 
        machinery_description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [category_id, machinery_name, is_motorized, sale_price, daily_rental_price, weight_kg, machinery_description];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // 2. Traer la data básica de la tabla pura (FindAll)
  async findAll() {
    const result = await pool.query("SELECT * FROM machinery");
    return result.rows;
  }

  // 3. Buscar una maquinaria específica por su ID
  async findById(
    id,
    client = pool
  ) {

    const result =
      await client.query(
        `
        SELECT *
        FROM machinery
        WHERE machinery_id = $1
        `,
        [id]
      );

    return result.rows[0];

  } 

  async findByIdWithStock(id) {
    const result = await pool.query(
      `
      SELECT
        m.*,
        c.category_name,
        COALESCE(SUM(ms.stock_quantity), 0) AS total_stock,
        COALESCE(SUM(CASE WHEN ms.status_id = 1 THEN ms.stock_quantity ELSE 0 END), 0) AS available_stock,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'stock_id', ms.stock_id,
              'serial_number', ms.serial_number,
              'status_id', ms.status_id,
              'status_name', st.status_name,
              'next_revision_date', ms.next_revision_date,
              'is_owned', ms.is_owned,
              'stock_quantity', ms.stock_quantity
            )
          ) FILTER (WHERE ms.stock_id IS NOT NULL), '[]'
        ) AS stock_details
      FROM machinery m
      INNER JOIN machinery_categories c ON m.category_id = c.category_id
      LEFT JOIN machinery_stock ms ON m.machinery_id = ms.machinery_id
      LEFT JOIN machinery_status st ON ms.status_id = st.status_id
      WHERE m.machinery_id = $1
      GROUP BY m.machinery_id, c.category_name
      `,
      [id]
    );
    return result.rows[0];
  }

  // oeeeeeeeeeeeeeee aún debo actualizar esta mierda, se necesita cambiar los datos que se traen
  /*
  async findTableData(page=1, limit=10, search="") {
    
    const offset = (page - 1) * limit;

    const query = `
        SELECT
          m.machinery_id,
          m.machinery_name,
          m.next_revision_date,
          m.is_motorized,
          m.sale_price,
          m.daily_rental_price,
          m.weight_kg,
          m.stock_quantity,
          m.is_owned,
          m.machinery_description,
          c.category_name,
          s.status_name
        FROM machinery m
        INNER JOIN machinery_categories c ON m.category_id = c.category_id
        INNER JOIN machinery_status s ON m.status_id = s.status_id
        WHERE
            $1 = ''
            OR LOWER(machinery_name) LIKE LOWER($2)
        ORDER BY m.machinery_id DESC
        LIMIT $3
        OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
        `
        SELECT COUNT(*)
        FROM machinery
        WHERE
            $1 = ''
            OR LOWER(machinery_name) LIKE LOWER($2)
        `,
        [search, `%${search}%`]
    );

    const total = Number(totalQuery.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

  }

  */

  async findTableData(page = 1, limit = 10, search = "") {
    const offset = (page - 1) * limit;

    const query = `
      SELECT
        m.machinery_id,
        m.machinery_name,
        m.machinery_description,
        m.is_motorized,
        m.sale_price,
        m.daily_rental_price,
        m.weight_kg,
        c.category_name,
        COALESCE(SUM(ms.stock_quantity), 0) AS total_stock,
        COALESCE(SUM(CASE WHEN ms.status_id = 1 THEN ms.stock_quantity ELSE 0 END), 0) AS available_stock,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'stock_id', ms.stock_id,
              'serial_number', ms.serial_number,
              'status_id', ms.status_id,
              'status_name', st.status_name,
              'next_revision_date', ms.next_revision_date,
              'is_owned', ms.is_owned,
              'stock_quantity', ms.stock_quantity
            )
          ) FILTER (WHERE ms.stock_id IS NOT NULL), '[]'
        ) AS stock_details
      FROM machinery m
      INNER JOIN machinery_categories c ON m.category_id = c.category_id
      LEFT JOIN machinery_stock ms ON m.machinery_id = ms.machinery_id
      LEFT JOIN machinery_status st ON ms.status_id = st.status_id
      WHERE
          $1 = ''
          OR LOWER(m.machinery_name) LIKE LOWER($2)
      GROUP BY m.machinery_id, c.category_name
      ORDER BY m.machinery_id DESC
      LIMIT $3 OFFSET $4
    `;

    const result = await pool.query(query, [search, `%${search}%`, limit, offset]);

    const totalQuery = await pool.query(
      `
      SELECT COUNT(*)
      FROM machinery
      WHERE $1 = '' OR LOWER(machinery_name) LIKE LOWER($2)
      `,
      [search, `%${search}%`]
    );

    const total = Number(totalQuery.rows[0].count);

    return {
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }


  // 5. Actualizar los datos de una maquinaria
  async update(id, machineryData) {
    if (!machineryData) throw new Error("Datos insuficientes para actualizar.");


    const {category_id, machinery_name, is_motorized, sale_price, daily_rental_price, weight_kg, machinery_description} = machineryData

    const query = `
      UPDATE machinery
      SET 
        category_id = $1,
        machinery_name = $2,
        is_motorized = $3,
        sale_price = $4,
        daily_rental_price = $5,
        weight_kg = $6,
        machinery_description = $7
      WHERE machinery_id = $8
      RETURNING *
    `;

    const values = [category_id, machinery_name, is_motorized, sale_price, daily_rental_price, weight_kg, machinery_description, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // 6. Eliminar un registro de maquinaria
  async delete(id) {
    const result = await pool.query(
      "DELETE FROM machinery WHERE machinery_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }





}
