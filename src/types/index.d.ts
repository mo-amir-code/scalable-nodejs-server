import * as express from 'express';
import { UserType } from './schema.types.ts';

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}