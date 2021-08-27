

export interface DialogInterface {
  cancelButtonLabel: string;
  confirmButtonLabel: string;
  dialogHeader: string;
  dialogContent:ComponentType;
  callbackMethod: () => void;
}
export interface ComponentType<T = any> {
  new (...args: any[]): T;
}
