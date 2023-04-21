import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";

import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import DashbordController from "./controllers/DashbordController";
import ReserveControlle from "./controllers/ReserveControlle";

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.post("/houses", upload.single("thumbnail"), HouseController.store);

routes.get("/houses", HouseController.index);

routes.put(
  "/houses/:house_id",
  upload.single("thumbnail"),
  HouseController.update
);

routes.delete("/houses", HouseController.destroy);

routes.get("/dashboard", DashbordController.show);

routes.post("/houses/:house_id/reserve", ReserveControlle.store);

routes.get("/reserve", ReserveControlle.index);

routes.delete("/reserve/cancel", ReserveControlle.destroy);

export default routes;
