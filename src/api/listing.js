import { securedApi } from "./config";

const listingController = {

  angelfarmerlist: async (data) => {
    try {
      let result = await securedApi.get(`/api/get-angelfarmers?search=${data}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
  farmerlist: async (data) => {
    try {
      let result = await securedApi.get(`/api/get-farmers?search=${data}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
  addFarmer: async (data) => {
    try {
      let result = await securedApi.post(`/api/add-farmer`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  addAngelFarmer: async (data) => {
    try {
      let result = await securedApi.post(`/api/add-angel`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  addFarm: async (data) => {
    try {
      let { user_id, file, type, crop } = data;
      let fd = new FormData();
      fd.append("user_id", user_id);
      fd.append("file", file);
      fd.append("type", type);
      fd.append("crop", crop);

      let result = await securedApi.post(`/api/add-basic-farm`, fd);
      return result;
    } catch (error) {
      throw error;
    }
  },
  editProfile: async (data) => {
    try {
      let result = await securedApi.post(`/api/add-profile-admin`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  editfarm: async (data) => {
    try {
      let result = await securedApi.post(`/api/add-farm`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  viewfarm: async (data) => {
    try {
      let result = await securedApi.post(`/api/get-farms-User_id`, {
        user_id: data.value,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  viewstory: async (data) => {
    try {
      let result = await securedApi.post(`/api/view-story`, {
        user_id: data.value,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  addstory: async (data) => {
    // console.log("firstkwkdp", data);
    try {
      let result = await securedApi.post(`/api/add-story`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default listingController;
