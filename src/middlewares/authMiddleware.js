import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;

    // Verificar si existe header
    if (!authHeader) {
      return res.status(401).json({
        error: "Token requerido"
      });
    }

    // Separar Bearer TOKEN
    const token =
      authHeader.split(" ")[1];

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Guardar datos usuario
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      error: "Token inválido"
    });

  }

};

export default authMiddleware;