export interface ApiSuccess<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  timestamp: string;
}

export type FeatureModuleKey =
  | "auth"
  | "registration"
  | "users"
  | "properties"
  | "documents"
  | "admin";

export interface FeatureModuleDefinition {
  key: FeatureModuleKey;
  label: string;
  description: string;
}
