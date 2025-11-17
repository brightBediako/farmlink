import exppress from "express";
import {
    createBrandController,
    deleteBrandController,
    getAllBrandsController,
    getSingleBrandController,
    updateBrandController,
} from "../";
import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandsRoute = exppress.Router();

brandsRoute.post("/", isLoggedIn, isAdmin, createBrandController);
brandsRoute.get("/", getAllBrandsController);
brandsRoute.get("/:id", getSingleBrandController);
brandsRoute.delete("/:id", isLoggedIn, isAdmin, deleteBrandController);
brandsRoute.put("/:id", isLoggedIn, isAdmin, updateBrandController);

export default brandsRoute;