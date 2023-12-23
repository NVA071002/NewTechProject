const User = require("../model/User");

const UserService = require("../service/UserService");


const add = async(req, res) => {
    try{
        const data = req.body;
        console.log(data)
        if (!data){
            return res.status(200).json({
                status: "ERROR",
                message: "Data is required"
            });
        }
        const response = await UserService.createUser(data);
        return res.status(200).json(response);

    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

const update = async(req, res) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        console.log(userId);
        if (!userId){
            return res.status(200).json({
                status: "ERROR",
                message: "userId is required"
            });
        }
        const response = await UserService.update(userId, data);
        return res.status(200).json(response);

    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

module.exports ={add, update}