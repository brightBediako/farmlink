import exppress from "express";
import {
    createBrandController,
    deleteBrandController,
    getAllBrandsController,
    getSingleBrandController,
    updateBrandController,
} from "../controllers/brandsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";

const brandsRoute = exppress.Router();

brandsRoute.post("/", isLoggedIn, isAdmin, createBrandController);
brandsRoute.get("/", getAllBrandsController);
brandsRoute.get("/:id", getSingleBrandController);
brandsRoute.delete("/:id", isLoggedIn, isAdmin, deleteBrandController);
brandsRoute.put("/update-brand/:id", isLoggedIn, isAdmin, updateBrandController);

export default brandsRoute;