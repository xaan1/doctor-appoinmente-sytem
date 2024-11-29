

import express from 'express';



import { BookAppointment, CancelAppointment, GetAppointments, GetProfile, Login, Register, UpdateProfile } from '../controller/userController.js';
import { AuthUser } from '../middlewares/AuthUser.js';
import upload from '../middlewares/mutlter.js';
const userRouter = express.Router();




userRouter.post('/signup',  Register);





userRouter.post('/login',  Login);

userRouter.post('/update',    AuthUser ,    upload.single("image"),   UpdateProfile);


userRouter.get('/GetProfile',  AuthUser ,   GetProfile);



userRouter.post("/BookedAppointment", AuthUser, BookAppointment)

userRouter.get("/getappointments", AuthUser, GetAppointments)


// CancelAppointment

userRouter.post("/cancelappointment", AuthUser, CancelAppointment)
export default userRouter;