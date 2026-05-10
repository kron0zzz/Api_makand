import CreateUser from "../../application/use-cases/users/CreateUser.js";
import GetUserById from "../../application/use-cases/users/GetUserById.js";
import GetUsers from "../../application/use-cases/users/GetUsers.js";
import UpdateUser from "../../application/use-cases/users/UpdateUser.js";
import DeleteUser from "../../application/use-cases/users/DeleteUser.js";

import UserRepositoryMongo from "../repositories/UserRepositoryMongo.js";

const userRepository = new UserRepositoryMongo();
export const createUser = async (req, res) => {
  try {
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const getUsers = new GetUsers(userRepository);
    const users = await getUsers.execute();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const getUserById = new GetUserById(userRepository);
    const user = await getUserById.execute(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const updateUser = async (req, res) => {
    try {
        const updateUser = new UpdateUser(userRepository);
        const updatedUser = await updateUser.execute(req.params.id, req.body);

        if (!updatedUser) {
          console.log("no pai, no encontré el id")
            // Si el resultado es null, significa que el ID no se encontró
          return res.status(404).json({ error: "Usuario no encontrado" });
            
        }

        // Si se actualizó correctamente, respondemos con el objeto actualizado
        res.status(200).json(updatedUser);
    } catch (err) {
        // Si da error, mensaje 500
        res.status(500).json({ error: err.message });
    }
};




//Implementar el Delete

export const deleteUser = async (req, res) => {
    try {


        const deleteUser = new DeleteUser(userRepository);
        const deleted = await deleteUser.execute(req.params.id);

        if (!deleted) {
          console.log("no se pudo eliminar")
            // Si la compra no se encontró, responde con 404
          return res.status(404).json({ message: "Usuario no encontrado o ya eliminado" });
        }
        
        // Si la eliminación fue exitosa, responde con 204 No Content
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};