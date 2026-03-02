import { setupWorker } from 'msw/browser';
import { handlers } from '@urbancart/mocks';

export const worker = setupWorker(...handlers);
