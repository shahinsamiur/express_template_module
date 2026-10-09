export type DatabaseProvider =
  | "prisma"
  | "postgres"
  | "mongodb";

export interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export type DatabaseAdapterConstructor =
  new () => DatabaseAdapter;