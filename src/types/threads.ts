interface EnqueueRequestType {
  type: string;
  userId: string;
  payload: any;
  retryCount?: number
}

interface DequeueRequestType {
  type: string;
  userId: string;
}


export type {
    EnqueueRequestType,
    DequeueRequestType
}