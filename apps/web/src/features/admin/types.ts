export type RegistrationStatus = "NOT_QUALIFIED" | "QUALIFIED" | "PENDING";

export interface AdminRegistration {
  registrationId: string;
  propertyFound: boolean;
  deposit: number;
  city: string;
  propertyPrice: number;
  jointApplication: boolean;
  annualSalary: number;
  email: string;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRegistrationsResponse {
  items: AdminRegistration[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    search: string;
    status: RegistrationStatus | null;
  };
  statistics: {
    total: number;
    notQualified: number;
    qualified: number;
    pending: number;
  };
}
