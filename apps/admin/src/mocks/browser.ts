import { setupWorker } from 'msw/browser';
import { handlers } from '@apostle/mocks';

export const worker = setupWorker(...handlers);
