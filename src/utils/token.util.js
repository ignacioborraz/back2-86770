import jwt from "jsonwebtoken";

const createToken = (data) => {
  const token = jwt.sign(
    /* información a tokenizar */
    data,
    /* clave secreta para tokenizar */
    process.env.JWT_KEY,
    /* tiempo de expiración en segundos */
    { expiresIn: 60 * 60 * 24 * 7 }
  );
  return token;
};

const decodeToken = (headers) => {
  const authHeader = headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token is required");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  /* condicionar si no existe token */
  const decodeData = jwt.verify(token, process.env.JWT_KEY);
  return decodeData;
};

export { createToken, decodeToken };
