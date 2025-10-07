import { AdminAlbumByIdDto } from "@/interfaces/admin/admin-get-album-by-id.dto";
import claraApi from "@/lib/axios";

export const adminGetAlbumById = async (
  id: string
): Promise<AdminAlbumByIdDto> => {
  const { data } = await claraApi.get(`/admin/albums/${id}`);
  return data;
};
