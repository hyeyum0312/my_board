import { getUserHandlers } from './getHandlers';
import { postUserHandlers } from './postHandlers';
import { patchUserHandlers } from './patchHandlers';
import { deleteUserHandlers } from './deleteHandlers';

export const userHandlers = [
  ...getUserHandlers,
  ...postUserHandlers,
  ...patchUserHandlers,
  ...deleteUserHandlers,
];
