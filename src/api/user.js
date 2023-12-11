import { securedApi } from "./config";

const userController = {
  addFarmer: async (data) => {
    try {
      let result = await securedApi.post("/add-farmer");
      return result;
    } catch (error) {
      throw error;
    }
  },
};
export default userController;
