import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInDB =  async (user:User) => {
  const result =   await UserModel.create(user)
  return result;
}


const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
}
const getSingleUserFromDB = async (userId:string) => {
  const result = await UserModel.findOne({userId});
  // console.log(result);
  return result;
}

// const updateSingleUser = async (updatedData: User) => {
//   const result = await UserModel.updateOne({ userId: updatedData.userId }, updatedData);
//   return result;
// }

export const UserServices = {
    createUserInDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    // updateSingleUser
}