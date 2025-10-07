export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMonths: number;
  discountPercentage: number;
}

export interface ActiveSubscription {
  id: string;
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
}

export interface SubscriptionOrder {
  id: string;
  plan: SubscriptionPlan;
  amount: number;
  status: "pending" | "paid";
  createdAt: string;
}
