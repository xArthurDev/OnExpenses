import { Request } from 'express';
import { CreateMeta, UpdateMeta } from 'src/interfaces/meta/meta.interface';

export function getCreateMeta(userId: string, request: Request): CreateMeta {
  return {
    createdAt: new Date(),
    createdBy: userId,
    lastBrowserAgent: request.headers['user-agent'],
    lastIpAddress: request.ip,
  };
}

export function getUpdateMeta(
  userId: string,
  request: Request,
  oldMeta: CreateMeta,
): UpdateMeta {
  return {
    ...oldMeta,
    updatedAt: new Date(),
    updatedBy: userId,
    lastBrowserAgent: request.headers['user-agent'],
    lastIpAddress: request.ip,
  };
}
