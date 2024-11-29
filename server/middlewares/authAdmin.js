
import jwt from 'jsonwebtoken'


export const AuthAdmin = async (req, res, next) => {


    try {


        const Token = req.header("Authorization");
        // console.log(Token , "Token in AuthAdmin");

        const atoken = req.header("Authorization")?.split(" ")[1];

        // console.log(atoken , "atoken in AuthAdmin");



        if(!atoken) return res.status(400).json({message : "Invalid token"});


      

        const decodeToken = jwt.verify(atoken , "adminloginsecreet");

        // console.log(decodeToken , "decodeToken in AuthAdmin");


      

        // if(decodeToken !== process.env.Admin_email + process.env.Admin_password){
        //     return res.status(400).json({message : "Invalid token"});
        // }

        if (decodeToken.email !== process.env.Admin_email) {
            return res.status(400).json({ message: "Invalid token" });
        }

    

        console.log("Admin Authenticated" , decodeToken);


        next();


    }  catch(e){
        console.log(e , "error in AuthAdmin");
    }


}