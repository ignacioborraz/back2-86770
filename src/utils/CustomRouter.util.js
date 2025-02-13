import { Router } from "express";
import appyRes from "../middlewares/appyRes.mid.js";
import applyMidds from "../middlewares/applyMids.mid.js";
import applyPolicies from "../middlewares/applyPolicies.mid.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.use(appyRes);
  }
  getRouter = () => this.router;
  applyMiddlewares = (middlewares) => middlewares.map(applyMidds);
  create = (path, policies, ...middlewares) => this.router.post(path, applyPolicies(policies), this.applyMiddlewares(middlewares));
  read = (path, policies, ...middlewares) => this.router.get(path, applyPolicies(policies), this.applyMiddlewares(middlewares));
  update = (path, policies, ...middlewares) => this.router.put(path, applyPolicies(policies), this.applyMiddlewares(middlewares));
  destroy = (path, policies, ...middlewares) => this.router.delete(path, applyPolicies(policies), this.applyMiddlewares(middlewares));
  use = (path, ...middlewares) => this.router.use(path, this.applyMiddlewares(middlewares));
}

export default CustomRouter;
