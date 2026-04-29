import { test, expect } from '@playwright/test';
import { AMOUNTS, CURRENCY, REJECTION_REASONS, STATUS } from './constants';
import { createPayment, getPayment, updatePaymentStatus } from './helpers';

test.describe('Payments API - Suite de Automatización', () => {

  test('POST /payments - crear pago aprobado (flujo positivo)', async ({ request }) => {
    const response = await createPayment(request, { amount: AMOUNTS.STANDARD });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body.status).toBe(STATUS.APPROVED);
    expect(body.amount).toBe(AMOUNTS.STANDARD);
    expect(body.currency).toBe(CURRENCY);
  });

  test('GET /payments/:id - consultar pago existente (flujo positivo)', async ({ request }) => {
    const response = await getPayment(request, 1);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id');

  });

  test('PATCH /payments/:id - rechazar pago por fondos insuficientes (flujo negativo)', async ({ request }) => {
    const response = await updatePaymentStatus(request, 1, STATUS.REJECTED, {
      reason: REJECTION_REASONS.INSUFFICIENT_FUNDS,
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.status).toBe(STATUS.REJECTED);
    expect(body.reason).toBe(REJECTION_REASONS.INSUFFICIENT_FUNDS);
  });

  test('POST /payments - flujo completo E2E: crear y aprobar pago', async ({ request }) => {
    const createResponse = await createPayment(request, {
      amount: AMOUNTS.LARGE,
      status: STATUS.PENDING,
    });

    expect(createResponse.status()).toBe(201);
    const created = await createResponse.json();
    expect(created).toHaveProperty('id');
    expect(created.status).toBe(STATUS.PENDING);
    expect(created.amount).toBe(AMOUNTS.LARGE);

    // Uso de API mock: se actualiza un recurso fijo en lugar del created.id real
    const updateResponse = await updatePaymentStatus(request, 1, STATUS.APPROVED);

    expect(updateResponse.status()).toBe(200);
    const updated = await updateResponse.json();
    expect(updated.status).toBe(STATUS.APPROVED);
  });

});
