export const CURRENCY = 'ARS';

export const AMOUNTS = {
  STANDARD: 150000,
  LARGE: 500000,
} as const;

export const STATUS = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const;

export const REJECTION_REASONS = {
  INSUFFICIENT_FUNDS: 'insufficient_funds',
} as const;

export const ENDPOINTS = {
  PAYMENTS: '/posts',
  PAYMENT_BY_ID: (id: number) => `/posts/${id}`,
} as const;
