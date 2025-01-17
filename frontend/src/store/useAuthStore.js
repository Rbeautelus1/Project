import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    //Check if user is authenticated
    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("http://localhost:5001/api/auth/check");

            set({authUser:res.data})
        } catch (error){
            console.log("Error in checkAuth:", error);
            set({authUser:null})

        } finally{
            set({ isCheckingAuth: false});
        }
    },

    // Signup new user
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

}));