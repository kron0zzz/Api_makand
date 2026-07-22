// import LoginUser from "../../application/use-cases/auth/LoginUser.js"

// import UserRepository from "../repositories/UserRepository.js";
// const userRepository = new UserRepository();

// export const login = async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     const loginUser =
//       new LoginUser(userRepository);

//     const result =
//       await loginUser.execute(
//         email,
//         password
//       );

//     res.status(200).json(result);

//   } catch (err) {

//     res.status(401).json({
//       error: err.message
//     });

//   }

// };


import LoginUser from "../../application/use-cases/auth/LoginUser.js";
import UserRepository from "../repositories/UserRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendRecoveryEmail } from "../services/emailService.js";

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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Busca al usuario por su correo
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "No existe un usuario registrado con este correo." });
    }

    // Generamos un token temporal que expira en 15 minutos
    const resetToken = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Enviamos el correo usando el servicio de Nodemailer
    await sendRecoveryEmail(user.user_email, resetToken);

    res.status(200).json({ message: "Correo de recuperación enviado con éxito. Revisa tu bandeja." });
  } catch (err) {
    console.error("Error en forgotPassword:", err);
    res.status(500).json({ error: "Error al enviar el correo de recuperación." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verificamos que el token sea válido y no haya expirado
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id;

    // Encriptamos la nueva contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizamos en la base de datos
    await userRepository.updatePassword(userId, hashedPassword);

    res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (err) {
    console.error("Error en resetPassword:", err);
    res.status(400).json({ error: "El enlace es inválido o ha expirado." });
  }
};