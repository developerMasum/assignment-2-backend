import express from "express";
import { userController } from "./user.controller";

const router = express.Router()

router.post('/',userController.createUser)
router.get('/',userController.getAllUsers)
router.get('/:userId',userController.getSingleUser)
// router.put('/update/:_id',userController.updateSingleUser)


export const userRoutes = router;