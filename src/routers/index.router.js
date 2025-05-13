import CustomRouter from "../utils/CustomRouter.util.js";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

class IndexRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.router.use("/", viewsRouter);
    this.router.use("/api", apiRouter);
  };
}

const router = new IndexRouter();
export default router.getRouter();
