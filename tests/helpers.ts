import { APIRequestContext } from '@playwright/test';
import { AMOUNTS, CURRENCY, ENDPOINTS, STATUS } from './constants';

type PaymentData = {
  amount?: number;
  currency?: string;
  status?: string;
  userId?: number;
};

export async function createPayment(request: APIRequestContext, overrides: PaymentData = {}) {
  return request.post(ENDPOINTS.PAYMENTS, {
    data: {
      title: 'payment',
      amount: AMOUNTS.STANDARD,
      currency: CURRENCY,
      status: STATUS.APPROVED,
      userId: 1,
      ...overrides,
    },
  });
}

export async function getPayment(request: APIRequestContext, id: number) {
  return request.get(ENDPOINTS.PAYMENT_BY_ID(id));
}

export async function updatePaymentStatus(
  request: APIRequestContext,
  id: number,
  status: string,
  extra: Record<string, string> = {}
) {
  return request.patch(ENDPOINTS.PAYMENT_BY_ID(id), {
    data: { status, ...extra },
  });
}
