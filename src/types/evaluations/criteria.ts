export type CriteriaActionStatus = "idle" | "success" | "error";

export type CriteriaActionState = {
  status: CriteriaActionStatus;
  message?: string;
  fieldErrors?: Partial<Record<"name" | "description" | "weight", string>>;
};

export const initialCriteriaActionState: CriteriaActionState = {
  status: "idle",
};

export type CriterionFormValues = {
  name: string;
  description: string;
  weight: number;
};

export type CreateCriteriaAction = (
  input: CriterionFormValues
) => Promise<CriteriaActionState>;

export type UpdateCriteriaAction = (
  input: { id: number } & CriterionFormValues
) => Promise<CriteriaActionState>;

export type DeleteCriteriaAction = (
  input: { id: number }
) => Promise<CriteriaActionState>;
