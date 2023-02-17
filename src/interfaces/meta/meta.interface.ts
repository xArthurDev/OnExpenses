export interface CreateMeta {
  createdAt: Date;
  createdBy: string;
  lastBrowserAgent: string;
  lastIpAddress: string;
}

export interface UpdateMeta {
  updatedAt: Date;
  updatedBy: string;
  lastBrowserAgent: string;
  lastIpAddress: string;
}
