import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const {user : userData} = req.body;

    const result = await UserServices.createUserInDB(userData);
  
    res.status(200).json({
      success: true,
      message: 'A user has been added Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error
    });
  }
};


const getAllUsers =async (req:Request, res:Response) => {
  try {
    const result= await UserServices.getAllUserFromDB();

   res.status(200).json({
      success: true,
      message: "User fetched successfully!",
     data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on fetching',
      error
    });
  }
}



const getSingleUser =async (req:Request,res:Response)=>{

try {
  const {userId} = req.params;
  const result = await UserServices.getSingleUserFromDB(userId)

res.status(200).json({
  success: true,
      message: "User fetched successfully!",
     data: result,
})

} catch (error) {
  res.status(500).json({
    success: false,
    message: 'something went wrong on fetching',
    error
  });
}
}
const updateSingleUser =async (req:Request,res:Response)=>{

try {
  const {updatedData} = req.body;
  const result = await UserServices.getSingleUserFromDB(updatedData)

res.status(200).json({
  success: true,
      message: "User updated successfully!",
     data: result,
})

} catch (error) {
  res.status(500).json({
    success: false,
    message: 'something went wrong on fetching',
    error
  });
}
}


export const userController ={
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser
}