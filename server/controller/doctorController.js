import doctorModel from "../model/doctorModel.js";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";
import appointmentModel from "../model/appointment.js";

import mongoose from "mongoose";

export const getAllDoctor = async (req, res) => {
    try {
        
        const doctor = await doctorModel.find({});

        return res.status(200).json({ message: "All Doctor list"   ,success : true, result : doctor});

    }catch(e){
        console.log(e, "error in allDoctor");
    }
};




// api doctor login


export const doctorLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email});
        console.log(doctor , "doctor");

        if(!doctor){
            return res.status(400).json({message: "Invalid Credentials", success: false});
        }


        const isMatch = await bcrypt.compare(password, doctor.password);


        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials", success: false});
        } else {
            const token = jwt.sign({id: doctor._id}, "test", {expiresIn: "2h"});
            return res.status(200).json({message: "Login Success", success: true, token: token, result: doctor});
        }


    }catch(e){
        console.log(e, "error in doctorLogin");
    }
}





// api doctor appointment




export const doctorAppointment = async (req, res) => {
    try  {

        const {doctorId} = req.body;
        console.log(doctorId, "docId from request body");

        console.log(req.body.doctorId, "docId from request body");


        const appointmentDoctor = await appointmentModel.find({
            doctorId : doctorId
        });

        console.log(appointmentDoctor, "appointmentDoctor");
        

        // const xaan =   await appointmentModel.find({ doctorId: "673ecf9759128e2cbfdaf914" })


        // console.log(xaan, "xaan");
     
        return res.status(200).json({message: "Doctor Appointment", success: true, result: appointmentDoctor});



    } catch(e){
        console.log(e, "error in doctorAppointment");
    }

}
