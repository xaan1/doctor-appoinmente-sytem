
import mongoose from 'mongoose';

const appointment = new mongoose.Schema({

    userid : {
        type : String,
        required : true
    },

    doctorId : {
        type : String,
        required : true
    },


    slotDate : {
        type : Date,
     
    },

    slotTime : {
        type : String,
      
    },

    userData : {
        type : Object,
        required : true
    },

    doctorData : {
        type : Object,
        required : true
    },

    amount : {
        type : Number,
        required : true
    },

    date : {
        type : Date,
        required : true
    },

    cancelled : {
        type : Boolean,
        default : false
    },

    payment : {
        type : Boolean,
        default : false
    },

    isCompleted : {
        type : Boolean,
        default : false
    }





})



const appointmentModel =  mongoose.model('appointment', appointment);



export default appointmentModel;