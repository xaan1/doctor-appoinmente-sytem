
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mangodb.js';
import cloudinaryConfig from './config/cloudnry.js';
import adminRouter from './router/adminRoute.js';
import doctorRouter from './router/doctoroute.js';
import userRouter from './router/userrouter.js';

const app = express();



dotenv.config();



app.use(cors());

app.use(express.json());



connectDB()
cloudinaryConfig()



// routes



// adminRouter


app.use("/api/admin"  , adminRouter)


// doctor route

app.use("/api/doctors"  , doctorRouter)




//  user router


app.use("/api/user"  , userRouter)






// error handler


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})