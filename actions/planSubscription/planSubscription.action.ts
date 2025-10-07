import claraApi from "@/lib/axios";

export type SubscriptionPlansResult =
  | { success: true; data: any[] } // luego podés tipar como SubscriptionPlan[]
  | { success: false; error: string };

export const fetchPlans = async (): Promise<SubscriptionPlansResult> => {
  try {
    const { data } = await claraApi.get("/subscriptions/plans");
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al cargar los planes.";
    return { success: false, error: message };
  }
};

export const fetchActiveSubscription = async () => {
  try {
    const { data } = await claraApi.get(`/subscriptions/me`);
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al obtener la suscripción.";
    return { success: false, error: message };
  }
};

export const changeSubscription = async (planId: string) => {
  try {
    const { data } = await claraApi.patch(`/subscriptions/change`, { planId });
    return { success: true, data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al cambiar la suscripción.";
    return { success: false, error: message };
  }
};
