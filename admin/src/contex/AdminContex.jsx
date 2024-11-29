import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext()



const AdminContextProvider = ({children}) => {


    const [atoken , setAtoken] = useState(localStorage.getItem('atoken')  ? localStorage.getItem('atoken') : null)
    const backEndUrl = "http://localhost:3000"

    const [dashboard , setDashboard] = useState([])
    


    async function cancelappointment(appointmentId) {
      
        try {
    
    
      const { data } = await axios.put(`${backEndUrl}/api/admin/CancelAppointmentAdmin`, {
        appointmentId : appointmentId
      }, {
        headers: {
          Authorization: `Bearer ${atoken}`
        }
      })
    
    console.log(data, "data in cancel appointment");

    if(data.success){
        getAppointments()
        alert(data.message)
    }
    
      console.log(data, "data in cancel appointment");
         
    } catch (error) {
      console.log(error);
    }
    
    }

    const [Appointment , setAppointment] = useState([])


    async function getAppointments(){

        try {


            const {data} = await axios.get(`${backEndUrl}/api/admin/getAppoinments`, {
                headers: {
                    Authorization: `Bearer ${atoken}`
                }
            })
 
            console.log(data ,"getAppointments")

            if(data.success){
                setAppointment(data.result)
            }
    
        } catch(e){
          console.log(e , "error in getAppointments");
        }
        
      }


      useEffect(() => {

        getAppointments()
      },[])




      const getDashboard = async () => {

        try {
    
          const { data } = await await axios.get(`${backEndUrl}/api/admin/adminDashboard`, {
            headers: {
              Authorization: `Bearer ${atoken}`
            }
          })
   
    
          if (data.success) {
            setDashboard(data.result)
          
          }
    
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        getDashboard()
      }, [])


    const value = {
        atoken,
        setAtoken,
        backEndUrl,
        Appointment , setAppointment,
        cancelappointment,
        dashboard,
        getDashboard

    }






    return (

        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )

}


export default  AdminContextProvider