
import express from 'express';
import { addDoctor, adminDashboard, adminLogin, allDoctor, CancelAppointmentAdmin, changeAvailability, getAppoinments } from '../controller/adminControoler.js';
import upload from '../middlewares/mutlter.js';
import { AuthAdmin } from '../middlewares/authAdmin.js';



const adminRouter = express.Router();






adminRouter.post("/add_Doctor" ,   AuthAdmin,  upload.single("image"),  addDoctor)
//  all doctr list
adminRouter.get("/all_Doctor" , AuthAdmin,    allDoctor)

adminRouter.post("/login" ,    adminLogin)

adminRouter.put("/change_Availability" ,   AuthAdmin , changeAvailability)

adminRouter.get("/getAppoinments" , AuthAdmin , getAppoinments)



adminRouter.put("/CancelAppointmentAdmin" ,   AuthAdmin , CancelAppointmentAdmin)

adminRouter.get("/adminDashboard" , AuthAdmin , adminDashboard)

export default adminRouter;