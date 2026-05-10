export default class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id, updatedData) {
        // Llama directamente al método 'update' del repositorio.
        const updatedUser = await this.userRepository.update(id, updatedData);

        // Opcional: verifica si la compra fue encontrada y actualizada.
        if (!updatedUser) {
            console.warn(`No se encontró ningun usuario con el id: ${id}`);
            return null; // Devuelve null si no se encontró
        }
        
        return updatedUser;
    }
}