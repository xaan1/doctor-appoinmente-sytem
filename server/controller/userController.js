import userModel from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../model/doctorModel.js";
import appointmentModel from "../model/appointment.js";

export const Register = async (req, res) => {



    try {


        const {name , email , password  } = req.body;


      
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"})
        }


        const userExist = await userModel.findOne({email})


        if(userExist){
            return res.status(400).json({message: "User already exist"})
        }



        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid Email"})
        }


        if(password.length < 8){
            return res.status(400).json({message: "Password must be 8 characters long"})
        }


        const salt = await bcrypt.genSalt(10);


        const hashPassword = await bcrypt.hash(password, salt);


        const user = new userModel({
            name,
            email,
            password: hashPassword,
          
        })



        await user.save();

        const token = jwt.sign({id : user._id}, "userSeceatwaaaye", { expiresIn: "1h" });


        res.status(200).json({message: "User registered successfully"  , success : true , user , token})




    } catch (error) {
        console.log(error)
    }
}






export const Login = async (req, res) => {

    try {

        const {email , password} = req.body;


        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"})
        }


        const user = await userModel.findOne({email})



        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }



        const isMatch = await bcrypt.compare(password, user.password)




        if(isMatch) {
            const token = jwt.sign({id : user._id}, "userSeceatwaaaye", { expiresIn: "1h" });
            res.status(200).json({message: "User logged in successfully" , success : true , token  ,user})

        } else {
            return res.status(400).json({message: "Invalid Credentials"})
        }



    } catch (error) {
        console.log(error)
    }

}




// update user profile



export const UpdateProfile = async (req, res) => {

    const {userid} = req.body
    console.log(req.body , "req.body in update profile")

    console.log(userid , "userId in update profile")


    try {

   
        // const imgFile = req.file

        // console.log(imgFile , "iamgeFile in update profile")




        // const user = await userModel.findById(userid)

        // console.log(user , "user in update profile")

    
        // if(!user){
        //     return res.status(400).json({message: "User does not exist"})
        // }


        // const updatedUser = await userModel.findByIdAndUpdate(userid, {
        //    name , phone , dop , address:JSON.parse(address)
        // })


        // if(imgFile){
           
        //     const imgPath = cloudinary.uploader.upload(imgFile.path ,{resource_type: "auto"})

        //     console.log(imgPath , "imgPath in update profile")

        //     const imageUrl = imgPath.secure_url


        //   await userModel.findByIdAndUpdate(userid, {
        //      image : imageUrl
        //     })
            
        // }

        // res.status(200).json({message: "User updated successfully" , success : true , updatedUser})

      

    } catch (error) {
        console.log(error)
    }
}





// get profile


export const GetProfile = async (req, res) => {
    
        try {
    
            const {userid} = req.body

            console.log(userid , "userId in get profile")
    
            const user = await userModel.findById(userid)


            if(!user){
                return res.status(400).json({message: "User does not exist"})
            }


            res.status(200).json({message: "User profile" , success : true , user})

        } catch (error) {
            console.log(error)
        }
}






// api to Book Appointment
   


 export const BookAppointment = async (req, res) => {
    try {
        const { userid, doctorId, slotDate, slotTime } = req.body;

        const doctorData = await doctorModel.findById(doctorId);

        if (!doctorData.available) {
            return res.status(400).json({ message: "Doctor does not exist", success: false });
        }

        let slot_booked = doctorData.slot_booked;

        if (slot_booked[slotDate]) {
            if (slot_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ message: "Slot already booked", success: false });
            } else {
                slot_booked[slotDate].push(slotTime);
            }
        } else {
            slot_booked[slotDate] = [];
            slot_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userid);

        delete doctorData.slot_booked;

        // Convert slotDate from string to Date object
        const [day, month, year] = slotDate.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}`);

        const appointmentData = {
            userid,
            doctorId,
            slotDate: formattedDate, // Corrected
            slotTime,
            userData,
            doctorData,
            amount: doctorData.fees,
            date: new Date(), // Use current date
        };

        const appointment = new appointmentModel(appointmentData);

        await appointment.save();

        await doctorModel.findByIdAndUpdate(doctorId, {
            slot_booked,
        });

        res.status(200).json({ message: "Appointment booked successfully", success: true, appointment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", success: false });
    }
};




// get list of appointments user



export const GetAppointments = async (req, res) => {
    try {
        const { userid } = req.body;

        const appointments = await appointmentModel.find({ userid });
        

        res.status(200).json({ message: "Appointments fetched successfully", success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred", success: false });
    }
}



// cancel appointment



export const CancelAppointment = async (req, res) => {
    try {
      const { appointmentId, userid } = req.body;
  
      const appointment = await appointmentModel.findById(appointmentId);
  
      // Verify if user is the owner of the appointment
      if (appointment.userid.toString() !== userid) {
        return res.status(400).json({ message: "You are not the owner of the appointment" });
      }
  
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
  