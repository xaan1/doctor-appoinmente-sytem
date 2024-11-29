
import jwt from 'jsonwebtoken'


export const AuthDoctor = async (req, res, next) => {


    try {


        const Token = req.header("Authorization");

        console.log(Token , "Token in AuthAdmin");

        const token = req.header("Authorization")?.split(" ")[1];

  



        if(!token) return res.status(400).json({message : "Invalid token user"});



      

   

        const decodeToken = jwt.verify(token, "test");

        console.log(decodeToken , "decodeToken in userAuth");


        req.body.doctorId = decodeToken.id;


        console.log("doctor token" , decodeToken);


        next();


    }  catch(e){
        console.log(e , "error in AuthAdmin");
    }


}