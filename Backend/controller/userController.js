const User = require('../model/userModel');
const ListTD = require('../model/listModel')
const userController = {

//get userID
    // getUsersID : async(req,res) =>{
    //     const {userID} = req.params;
    //     const user = await User.findById(userID);
    //     res.status(200).json({user})
    // },

    // getUserTDList : async(req,res) => {
    //     const {userID } =  req.params;
    //     const user = await User.findById(userID).populate('tdlist');
    //     res.status(200).json({tdlist: user.tdlist});
    // },

    // get all user
    getAllUsers : async(req,res)=>{
        try { 
            const isAdmin = req.user.isAdmin;
            if(isAdmin){
            const user = await User.find({});
            res.status(200).json({user});
            }else {
               res.status(500).json('Bạn không có quyền truy cập')
            }
            
        } catch (error) {
            res.status(500).json(error); //phẩn hồi xảy ra khi có sự cố
        } 
    },

    // postUserTDList : async (req,res) => {
    //     const {userID} = req.params;
    //     const newListTD = new ListTD (req.body);
    //     const user = await User.findById(userID);
    //     newListTD.owner = user;
    //     await newListTD.save();
    //     user.tdlist.push(newListTD._id);
    //     await user.save();
    //     res.status(200).json({tdlist: newListTD})
    // },

    // delete user 
    deleteUser : async(req,res) =>{
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },


   // update user
    updateUser : async(req,res) =>{
        try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new : true}
            )
            res.json({
                data:updateUser,
                mesage:"Update thành công",
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = userController;