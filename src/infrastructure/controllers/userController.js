import CreateUser from "../../application/use-cases/users/CreateUser.js";
import GetUsers from "../../application/use-cases/users/GetUsers.js";
import GetUserById from "../../application/use-cases/users/GetUserById.js";
import UpdateUser from "../../application/use-cases/users/UpdateUser.js";
import DeleteUser from "../../application/use-cases/users/DeleteUser.js";
import GetUsersTable from "../../application/use-cases/users/GetUsersTable.js"

import UserRepository from "../repositories/UserRepository.js";

const userRepository = new UserRepository();

export const createUser = async (req, res, next) => {
  try {
    const createUser =
      new CreateUser(userRepository);

    const user = await createUser.execute(
      req.body
    );

    res.status(201).json(user);

  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const getUsers =
      new GetUsers(userRepository);

    const users = await getUsers.execute();

    res.status(200).json(users);

  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const getUserById =
      new GetUserById(userRepository);

    const user =
      await getUserById.execute(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.status(200).json(user);

  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateUser =
      new UpdateUser(userRepository);

    const updatedUser =
      await updateUser.execute(
        req.params.id,
        req.body
      );

    res.status(200).json(updatedUser);

  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser =
      new DeleteUser(userRepository);

    await deleteUser.execute(req.params.id);

    res.status(204).send();

  } catch (err) {
    next(err);
  }
};


export const getUsersTable = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const search = req.query.search || "";
    const getUsersTable =
      new GetUsersTable(userRepository);

    const users = await getUsersTable.execute(page,limit, search);

    res.status(200).json(users);

  } catch (err) {
    next(err);
  }
};


