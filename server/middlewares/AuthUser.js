
import jwt from 'jsonwebtoken'


export const AuthUser = async (req, res, next) => {


    try {


        const Token = req.header("Authorization");

        console.log(Token , "Token in AuthAdmin");

        const token = req.header("Authorization")?.split(" ")[1];

        console.log(token , "token in userAuth");



        if(!token) return res.status(400).json({message : "Invalid token user"});


        console.log(token , "token in xaaan waaye");
      

   

        const decodeToken = jwt.verify(token, "userSeceatwaaaye");

        console.log(decodeToken , "decodeToken in userAuth");


        req.body.userid = decodeToken.id;


        // console.log("Admin Authenticated" , decodeToken);


        next();


    }  catch(e){
        console.log(e , "error in AuthAdmin");
    }


}