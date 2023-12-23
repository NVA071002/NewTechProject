const UserModel = require("../model/User");

const createUser = (data) => {  
    return new Promise(async (resolve, reject)=>{
        const {idUser, name, email,role} = data;
        try{

            const existedUser = await UserModel.findOne({
                email:email,

            });
            if(existedUser){
                resolve({
                    status:200, 
                    message:"Email already existed"
                })
            }
            const newUser = await UserModel.create({
                idUser, name, email,role
            });
            if (newUser) {
                resolve({
                  status: "OK",
                  message: "REGISTER SUCESS",
                  data: newUser,
                });
              } else {
                console.log(`error`);
              }
        }
       
    catch(error){
        reject(error);
    }
})
}
const update = (id, data) => {  
    return new Promise(async (resolve, reject)=>{
        try{

            const existedUser = await UserModel.findOne({
                _id:id,
            });
            console.log(existedUser);
            if(existedUser===null){
                resolve({
                    status:200, 
                    message:"User is not existed"
                })
            }
            const updatedUser = await UserModel.findByIdAndUpdate( id, data,{new:true
               
            });
            if (updatedUser) {
                resolve({
                  status: "OK",
                  message: "Update SUCESS",
                  data: updatedUser,
                });
              } else {
                console.log(`error`);
              }
        }
       
    catch(error){
        reject(error);
    }
})
}
module.exports = {createUser,update}