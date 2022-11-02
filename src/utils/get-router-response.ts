import { RouterResponse } from '@shared/types/router-response';

interface GetRouterResponseParams<T> {
    isSuccessed: boolean;
    data?: T | null;
    successMessage?: string;
    failureMessage?: string;
    errors?: string[];
}

function getRouterResponse<T> ({
  isSuccessed,
  data,
  successMessage = 'Successed',
  failureMessage = 'Something went wrong',
  errors
}: GetRouterResponseParams<T>): RouterResponse {
  return {
    ok: isSuccessed,
    data,
    message: isSuccessed ? successMessage : failureMessage,
    errors
  };
}

export {
  getRouterResponse
};
