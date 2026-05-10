export default class UpdatePurchase {
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    async execute(id, updatedData) {
        // Llama directamente al método 'update' del repositorio.
        const updatedPurchase = await this.purchaseRepository.update(id, updatedData);

        // Opcional: verifica si la compra fue encontrada y actualizada.
        if (!updatedPurchase) {
            console.warn(`No se encontró ninguna compra con el id: ${id}`);
            return null; // Devuelve null si no se encontró
        }
        
        return updatedPurchase;
    }
}