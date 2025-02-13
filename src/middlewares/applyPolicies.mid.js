import User from "../data/models/users.model.js";
import jwt from "jsonwebtoken";

const applyPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();
    const token = req?.cookies?.token;
    if (!token) return res.json401();
    const data = jwt.verify(token, process.env.JWT_KEY);
    const { role, user_id } = data;
    if (!role || !user_id) return res.json401();
    if (
      (policies.includes("USER") && role === "USER") ||
      (policies.includes("ADMIN") && role === "ADMIN")
    ) {
      const user = await User.findById(user_id);
      if (!user) return res.json401();
      req.user = user;
      return next();
    }
    return res.json403();
  } catch (error) {
    return res.json400(error.message);
  }
};

export default applyPolicies;
