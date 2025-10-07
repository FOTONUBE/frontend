import { GetUserResponse } from "@/interfaces/user/get-user.interface";
import { UpdateUserPayload } from "@/interfaces/user/update-user.interface";
import claraApi from "@/lib/axios";

export const getCurrentUser = async (): Promise<GetUserResponse> => {
  const { data } = await claraApi.get<GetUserResponse>("/users/me");
  return data;
};

export const updateUser = async (
  payload: UpdateUserPayload
): Promise<{ success: boolean; data?: GetUserResponse; error?: string }> => {
  try {
    const { data } = await claraApi.patch<GetUserResponse>(
      "/users/me",
      payload
    );
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || "Error al actualizar usuario",
    };
  }
};
