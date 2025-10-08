import { GetUserResponse } from "@/interfaces/user/get-user.interface";
import { UpdateUserPayload } from "@/interfaces/user/update-user.interface";
import claraApi from "@/lib/axios";
import Cookies from "js-cookie";

export const getCurrentUser = async (): Promise<GetUserResponse> => {
  const { data } = await claraApi.get<GetUserResponse>("/users/me");
  return data;
};

export const updateUser = async (
  payload: UpdateUserPayload
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Actualizamos datos del usuario
    await claraApi.patch("/users/me", payload);

    // No hacemos refresh del token
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || error.message,
    };
  }
};
