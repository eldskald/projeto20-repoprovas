export type ResponseType =
  | 'Ok'
  | 'Created'
  | 'Updated'
  | 'Deleted'
  | 'Unauthorized'
  | 'Not Allowed'
  | 'Not Found'
  | 'Conflict'
  | 'Unprocessable';

export interface ServerResponse {
  type: ResponseType;
  message?: string | object;
}