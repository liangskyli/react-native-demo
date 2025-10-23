import type {
  SerializedError,
  ShowErrorConfig,
} from '@liangskyli/axios-request';

const handleError: ShowErrorConfig['handleError'] = (
  err: SerializedError<'retCode', 'retMsg'>,
) => {
  switch (err.retCode) {
    default:
      break;
  }
};
export default handleError;
