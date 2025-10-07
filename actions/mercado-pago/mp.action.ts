// src/actions/mp.actions.ts
import claraApi from "@/lib/axios";

export interface MpTokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
  public_key: string;
  live_mode: boolean;
}

export interface MpLinkResponse {
  message: string;
  tokens: MpTokens;
}

export type MpLinkResult =
  | { success: true; data: MpLinkResponse }
  | { success: false; error: string };

/* ⚡ Ajuste: usamos GET y enviamos code en la query */
export const linkMercadoPago = async (code: string): Promise<MpLinkResult> => {
  try {
    const { data } = await claraApi.get<MpLinkResponse>(
      `/payment/mercadopago/callback?code=${encodeURIComponent(code)}`
    );
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response?.data?.message || "Error al vincular MercadoPago",
    };
  }
};
