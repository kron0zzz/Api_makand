export default class UpdateCustomer {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(id, updatedData) {
        // Llama directamente al método 'update' del repositorio.
        const updatedCustomer = await this.customerRepository.update(id, updatedData);

        // Opcional: verifica si la compra fue encontrada y actualizada.
        if (!updatedCustomer) {
            console.warn(`No se encontró ningun cliente con el id: ${id}`);
            return null; // Devuelve null si no se encontró
        }
        
        return updatedCustomer;
    }
}