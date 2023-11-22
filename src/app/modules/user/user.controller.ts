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
    console.log(error);
  }
};

export const userController ={
    createUser
}