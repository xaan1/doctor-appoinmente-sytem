

// admin api Controller
import {v2 as cloudinary} from "cloudinary"

import validator from "validator"

import bcrypt from "bcrypt"
import doctorModel from "../model/doctorModel.js";

import jwt from "jsonwebtoken"
import appointmentModel from "../model/appointment.js";
import userModel from "../model/userModel.js";
// add doctors


export const addDoctor = async (req, res) => {

    try {


        const { name, email, password, speciality, degree, experience, about, fees, address, date } = req.body;

        const imagFile = req.file;

 
        // checking for all data to add doctor


        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees  ) {

            return res.status(400).json({ message: "All fields are required"   ,success : false});

        }



        // validating email


        if(!validator.isEmail(email)){

            return res.status(400).json({ message: "Invalid Email"   ,success : false});

        }


        // validating  strong  password


        if(password.length < 8){

            return res.status(400).json({ message: "Password must be 8 characters long"   ,success : false});

        }



        // hashing password


        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);



        // upload image CLOUDNRY


        

const imagUpload = await cloudinary.uploader.upload(imagFile.path  ,{resource_type: "auto"});


const imageUrl = imagUpload.secure_url;


console.log(imageUrl ,"imageUrl");




        const doctor =  await new doctorModel({

            name: name,
            email: email,
            password: hashPassword,
            speciality: speciality,
            degree: degree,
            experience: experience,
            about: about,
            fees: fees,
            address: address,
            date: Date.now(),
            image: imageUrl

        })


        await doctor.save();


        return res.status(200).json({ message: "Doctor added successfully"   ,success : true, result : doctor});
























    } catch(e){
        console.log(e  , "error in addDoctor");
    }

}



//  all doctr list



export const allDoctor = async (req, res) => {
        
            try {
        
                const doctor = await doctorModel.find({});
        
                return res.status(200).json({ message: "All Doctor list"   ,success : true, result : doctor});
        
            }catch(e){
                console.log(e, "error in allDoctor");
            }
        }





        //  change Availability



export const changeAvailability = async (req, res) => {
            
                try {
            
                     const {docId} = req.body;

                    //  console.log(docId, "docId");


                     const doctor = await doctorModel.findById(docId);

                     console.log(doctor, "doctor");
            
                     await doctorModel.findByIdAndUpdate(docId, { available: !doctor.available }, { new: true });
            
                  
            
                return res.status(200).json({ message: "Doctor availability changed successfully"   ,success : true, result : doctor});
            
                }catch(e){
                    console.log(e, "error in changeAvailability");
                }
            }



//  admin login



export const adminLogin = async (req, res) => {
    
        try {
    
           
            
            const { email, password } = req.body;


            if (email === process.env.Admin_email && password === process.env.Admin_password) {
                const token = jwt.sign({ email: email }, "adminloginsecreet", { expiresIn: "1h" });
                return res.status(200).json({ message: "Admin login successfully", success: true, token: token });
            } else {
                return res.status(400).json({ message: "Invalid email or password", success: false });
            }
            

        
        


     




        }catch(e){
            console.log(e  , "error in adminLogin");
        }
}





// get appoinments




export const getAppoinments = async (req, res) => {
        
            try {
        
                const appointments = await appointmentModel.find({});
        
                return res.status(200).json({ message: "All appointments list"   ,success : true, result : appointments});
        
            }catch(e){
                console.log(e, "error in allDoctor");
            }
}



export const CancelAppointmentAdmin = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      const appointment = await appointmentModel.findById(appointmentId);
  
  
  
      // Mark appointment as cancelled
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
  
      // Releasing doctor slot
      const { doctorId, slotDate, slotTime } = appointment;
      const doctorData = await doctorModel.findById(doctorId);
  
      if (!doctorData) {
        return res.status(404).json({ message: "Doctor not found", success: false });
      }
  
      console.log(doctorData, "doctorData in cancel appointment");
  
      let slot_booked = doctorData.slot_booked;
  
      // Ensure slotDate exists in slot_booked and is an array
      if (slot_booked[slotDate] && Array.isArray(slot_booked[slotDate])) {
        slot_booked[slotDate] = slot_booked[slotDate].filter((slot) => slot !== slotTime);
      } else {
        console.warn(`Slot date ${slotDate} not found in doctor's schedule.`);
      }
  
      await doctorModel.findByIdAndUpdate(doctorId, {
        slot_booked,
      });
  
      res.status(200).json({ message: "Appointment cancelled successfully", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred", success: false });
    }
  };



  export const adminDashboard =  async (req, res) => {



    try {

        const doctors = await doctorModel.find({});
        const appointments = await appointmentModel.find({});
        const users = await userModel.find({});
        const totalDoctors = doctors.length;
        const totalAppointments = appointments.length;
        const totalUsers = users.length;
        const lastAppointments = appointments.reverse().slice(0, 5);

        const dahpourdData = {
            totalDoctors,
            totalAppointments,
            totalUsers,
            lastAppointments,
        }



        return res.status(200).json({ message: "Admin Dashboard", success: true, result: dahpourdData });



    }  catch(e){
        console.log(e  , "error in adminDashboard");
    }

    
  }