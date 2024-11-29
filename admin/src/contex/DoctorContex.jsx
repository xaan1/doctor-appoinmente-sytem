

import { createContext, useEffect, useState } from "react";

export const DoctorContext = createContext()
import axios from 'axios'



const DoctorContextProvider = ({children}) => {


    const [dtoken , setDtoken] = useState(localStorage.getItem('dtoken')  ? localStorage.getItem('dtoken') : null)
    const backEndUrlDoctor = "http://localhost:3000"

    const [appointments, setAppointments] = useState([])


    async function getAppointments() {

        try {


            const {data} = await axios.get(`${backEndUrlDoctor}/api/doctors/doctor-appoinment`, {
                headers: {
                    Authorization: `Bearer ${dtoken}`
                }
            })

      

            if (data.success
            ) {
                setAppointments(data.result)
            }
        
        }  catch (error) {
            console.log(error)
    }




}





const value = {
    dtoken,
    setDtoken,
    backEndUrlDoctor,
    appointments,
    getAppointments,
    setAppointments


}
    return (
        
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )

}


export default  DoctorContextProvider