import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import config from '../../config';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response) => {
  try {


    const { user: userData } = req.body;

    const zodParseData = userValidationSchema.parse(userData)

    const result = await UserServices.createUserInDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'A user has been added Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on fetching',
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on fetching',
      error,
    });
  }
};

// delete
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on deleting',
      error,
    });
  }
};


// put a data 
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const userData = req.body;
    const password = userData.password;

    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_round),
      );
      userData.password = hashedPassword;
    }
    // console.log(password);
    // console.log(userData, userId);
    const result = await UserServices.updateSingleUserFromDB(userId, userData);
   if (!result) {
      res.status(404).json({
        success: false,
        message: 'This field is not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User update successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong on Updating',
      error,
    });
  }
};


// order ar kaj 

const createOrder = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const orderData = req.body;

    // console.log(userId, orderData);
    const result = await UserServices.createOrderToDB(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);
    const result = await UserServices.getAllOrderByUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const  userId  = parseInt(req.params.userId);

    const result = await UserServices.getTotalPriceOfOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};



export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  createOrder,
  getAllOrders,
  getTotalPriceOfOrders
};
