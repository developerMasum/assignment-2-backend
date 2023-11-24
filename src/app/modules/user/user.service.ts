import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (userData: TUser) => {
  // const result =   await User.create(user)

  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('user already exists');
  }

  const result = await user.save();
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  // console.log(result);
  return result;
};

// delete
const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  // console.log(result);
  return result;
};

// update--

const updateSingleUserFromDB = async (userId: string, userData: TUser) => {
  // const user = new User();
  // console.log(userId);

  // if (!(await user.isUserExists(userId))) {
  //   throw new Error('User not found');
  // }

  const result = await User.updateOne({ userId: userId }, userData, {
    new: true,
    runValidators: true,
  });

  if (result.modifiedCount > 0) {
    const updatedUser = await User.findOne({ userId: userId });
    return updatedUser;
  }
};

// order ar kaj 
const createOrderToDB = async (userId: string, orderData: TUser) => {
  const user = new User();
  console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.updateOne(
    {
      userId,
    },
    {
      $push: {
        orders: orderData,
      },
    },
  );

  return result;
};

const getAllOrderByUserFromDB = async (userId: string) => {
  const user = new User();
  // console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);

  return result;
};

const getTotalPriceOfOrdersFromDB = async (userId: string) => {
  const user = new User();
  // console.log(userId);

  if (!(await user.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateSingleUserFromDB,
  getAllOrderByUserFromDB,
  getTotalPriceOfOrdersFromDB,
  createOrderToDB
};
