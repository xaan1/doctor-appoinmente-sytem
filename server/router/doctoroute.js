

import express from 'express';


import { doctorAppointment, doctorLogin, getAllDoctor} from '../controller/doctorController.js';
import { AuthDoctor } from '../middlewares/doctorMiddlwere.js';

const doctorRouter = express.Router();




doctorRouter.get("/getalldoctor" ,   getAllDoctor  )

doctorRouter.post("/doctorLogin", doctorLogin);


doctorRouter.get("/doctor-appoinment", AuthDoctor   ,  doctorAppointment)




export default doctorRouter;