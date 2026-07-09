export type PropertyFoundAnswer = "yes" | "no";
export type JointApplicationAnswer = "joint" | "sole";

export interface RegistrationQualificationState {
  propertyFound: PropertyFoundAnswer | null;
  depositGbp: string;
  city: string;
  propertyPriceGbp: string;
  jointApplication: JointApplicationAnswer | null;
  annualSalaryGbp: string;
  email: string;
}

export const initialRegistrationQualificationState: RegistrationQualificationState = {
  propertyFound: null,
  depositGbp: "",
  city: "",
  propertyPriceGbp: "",
  jointApplication: null,
  annualSalaryGbp: "",
  email: "",
};
