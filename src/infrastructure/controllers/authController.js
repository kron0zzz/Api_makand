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

const verificationCodes = new Map();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const login = async (req, res, next) => {
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
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "No existe un usuario registrado con este correo." });
    }

    const code = generateCode();

    verificationCodes.set(code, {
      user_id: user.user_id,
      expiresAt: Date.now() + 15 * 60 * 1000
    });

    await sendRecoveryEmail(user.user_email, code);

    res.status(200).json({ message: "Código de verificación enviado a tu correo. Revisa tu bandeja." });
  } catch (err) {
    next(err);
  }
};

export const verifyCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "No existe un usuario registrado con este correo." });
    }

    const stored = verificationCodes.get(code);

    if (!stored) {
      return res.status(400).json({ error: "Código inválido." });
    }

    if (stored.user_id !== user.user_id) {
      return res.status(400).json({ error: "Código no corresponde a este usuario." });
    }

    if (Date.now() > stored.expiresAt) {
      verificationCodes.delete(code);
      return res.status(400).json({ error: "El código ha expirado." });
    }

    verificationCodes.delete(code);

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        error: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userRepository.updatePassword(userId, hashedPassword);

    res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (err) {
    next(err);
  }
};
