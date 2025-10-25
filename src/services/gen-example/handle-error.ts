import type {
  SerializedError,
  ShowErrorConfig,
} from '@liangskyli/axios-request';

const handleError: ShowErrorConfig<
  any,
  any,
  SerializedError<'retCode', 'retMsg', number>
>['handleError'] = err => {
  switch (err.retCode) {
    default:
      break;
  }
};
export default handleError;
