import LoginUser from "../../application/use-cases/auth/LoginUser.js"

import UserRepository from "../repositories/UserRepository.js";
const userRepository = new UserRepository();

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const loginUser =
      new LoginUser(userRepository);

    const result =
      await loginUser.execute(
        email,
        password
      );

    res.status(200).json(result);

  } catch (err) {

    res.status(401).json({
      error: err.message
    });

  }

};