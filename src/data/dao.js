import dbConnect from "../utils/dbConnect.util.js"
import argsUtil from "../utils/args.util.js";
const { pers } = argsUtil;

let dao = {};

switch (pers) {
  case "memory":
    {
      console.log("memory database");
      const { productsManager, usersManager } = await import("./memory/manager.memory.js");
      dao = { productsManager, usersManager };
    }
    break;
  case "fs":
    {
      console.log("fs database");
      const { productsManager, usersManager } = await import("./fs/manager.fs.js");
      dao = { productsManager, usersManager };
    }
    break;
  default:
    {
      console.log("mongo database");
      await dbConnect();
      const { productsManager, usersManager } = await import("./mongo/manager.mongo.js");
      dao = { productsManager, usersManager };
    }
    break;
}

const { productsManager, usersManager } = dao;
export { productsManager, usersManager };
export default dao;
