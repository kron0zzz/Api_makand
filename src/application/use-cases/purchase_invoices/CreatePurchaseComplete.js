export default class CreatePurchaseComplete {
  constructor(
    purchaseInvoiceRepository,
    purchaseInvoiceDetailRepository,
    machineryRepository,
    machineryStockRepository,
    pool
  ) {
    this.purchaseInvoiceRepository = purchaseInvoiceRepository;
    this.purchaseInvoiceDetailRepository =
      purchaseInvoiceDetailRepository;
    this.machineryRepository = machineryRepository;
    this.machineryStockRepository =
      machineryStockRepository;

    this.pool = pool;
  }

  async execute(data) {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const {
        supplier_id,
        user_id,
        purchase_date,
        invoice_photo,
        details,
      } = data;

      let totalAmount = 0;

      // Calcular subtotal de cada detalle y total de la factura
      for (const detail of details) {
        detail.subtotal = detail.quantity * detail.unit_cost;
        totalAmount += detail.subtotal;
      }

      // Crear encabezado de factura
      const invoice =
        await this.purchaseInvoiceRepository.create(
          {
            supplier_id,
            user_id,
            purchase_date,
            total_amount: totalAmount,
            invoice_photo,
          },
          client
        );

      // Recorrer detalles
      for (const detail of details) {
        let machineryId = detail.machinery_id;

        // Si no viene machinery_id, crear nueva maquinaria
        if (!machineryId) {
          const machinery =
            await this.machineryRepository.create(
              detail.new_machinery,
              client
            );

          machineryId = machinery.machinery_id;
        }

        // Crear detalle de compra
        await this.purchaseInvoiceDetailRepository.create(
          {
            invoice_id: invoice.invoice_id,
            machinery_id: machineryId,
            quantity: detail.quantity,
            unit_cost: detail.unit_cost,
            subtotal: detail.subtotal,
          },
          client
        );

        // Obtener datos de la maquinaria
        const machinery =
          await this.machineryRepository.findById(
            machineryId,
            client
          );

        const serialNumbers = detail.serial_numbers || [];

        // Actualizar stock segun tipo de maquinaria
        if (machinery.is_motorized) {
          // Motorizada: una fila por unidad fisica
          for (let i = 0; i < detail.quantity; i++) {
            await this.machineryStockRepository.create(
              {
                machinery_id: machineryId,
                status_id: 1,
                serial_number: serialNumbers[i] || null,
                next_revision_date: null,
                is_owned: true,
                stock_quantity: 1,
              },
              client
            );
          }
        } else {
          // No motorizada: aumentar stock del registro existente
          const existingStock =
            await this.machineryStockRepository.findByMachineryId(
              machineryId,
              client
            );

          if (existingStock) {
            await this.machineryStockRepository.increaseStock(
              existingStock.stock_id,
              detail.quantity,
              client
            );
          } else {
            await this.machineryStockRepository.create(
              {
                machinery_id: machineryId,
                status_id: 1,
                serial_number: null,
                is_owned: true,
                stock_quantity: detail.quantity,
              },
              client
            );
          }
        }
      }

      await client.query("COMMIT");

      return invoice;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}