import { createContext, useEffect, useState } from "react";

import axios from "axios";



export const AppContext = createContext()




const AppContextProvider = ({children}) => {



    const backEndUrl = "http://localhost:3000";

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");


    console.log(token , "token in app context");
    const [userData , setUserData] = useState(false)


    const getDoctors = async () => {


        try {
            const {data} = await axios.get(`${backEndUrl}/api/doctors/getalldoctor`);
            if(data.success){
                console.log(data);
                setDoctors(data.
                    result
                    );
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getDoctors();
    }, [])




    // userData



    const loadUserData = async () => {

        try {



            const {data} = await axios.get(`${backEndUrl}/api/user/GetProfile`, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            if(data.success){
                console.log(data ,"data in load user data");
                setUserData(data.user);
            }
               
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadUserData();
    }, [token])





    const value ={
        doctors,
        getDoctors,
        backEndUrl,
        token, setToken,
        userData , setUserData

    }


    return (

        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )



}




export default AppContextProvider;