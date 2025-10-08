import CriteriaManager from "@/components/evaluations/criteria/criteria-manager";
import db from "@/server/db";
import { criteriaTable } from "@/server/db/schema";
import type {
  CreateCriteriaAction,
  CriteriaActionState,
  CriterionFormValues,
  DeleteCriteriaAction,
  UpdateCriteriaAction,
} from "@/types/evaluations/criteria";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const criteriaFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be 255 characters or fewer"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(255, "Description must be 255 characters or fewer"),
  weight: z
    .number()
    .int("Weight must be a whole number")
    .min(0, "Weight must be 0 or greater"),
});

const updateCriteriaSchema = criteriaFormSchema.extend({
  id: z
    .number()
    .int("Invalid criterion identifier")
    .positive("Invalid criterion identifier"),
});

const deleteCriteriaSchema = z.object({
  id: z
    .number()
    .int("Invalid criterion identifier")
    .positive("Invalid criterion identifier"),
});

const success = (message: string): CriteriaActionState => ({
  status: "success",
  message,
});

const failure = (
  message: string,
  fieldErrors?: CriteriaActionState["fieldErrors"]
): CriteriaActionState => ({
  status: "error",
  message,
  fieldErrors,
});

const parseFieldErrors = (
  error: z.ZodError
): CriteriaActionState["fieldErrors"] => {
  return {
    name: error.name,
    description: error.message,
  };
};

const criteriaPath = "/evaluations/criteria";

const createCriterion: CreateCriteriaAction = async (
  input: CriterionFormValues
) => {
  "use server";

  const parsed = criteriaFormSchema.safeParse(input);

  if (!parsed.success) {
    return failure(
      "We couldn't create this criterion. Check the highlighted fields and try again.",
      parseFieldErrors(parsed.error)
    );
  }

  try {
    await db.insert(criteriaTable).values(parsed.data);
    revalidatePath(criteriaPath);

    return success("Criterion created.");
  } catch (error) {
    console.error("Failed to create criterion", error);

    return failure(
      "Something went wrong while saving the criterion. Please try again."
    );
  }
};

const updateCriterion: UpdateCriteriaAction = async (input) => {
  "use server";

  const parsed = updateCriteriaSchema.safeParse(input);

  if (!parsed.success) {
    return failure(
      "We couldn't update this criterion. Check the highlighted fields and try again.",
      parseFieldErrors(parsed.error)
    );
  }

  const { id, ...values } = parsed.data;

  try {
    const [updated] = await db
      .update(criteriaTable)
      .set(values)
      .where(eq(criteriaTable.id, id))
      .returning({ id: criteriaTable.id });

    if (!updated) {
      return failure(
        "We couldn't find that criterion. It may have already been removed."
      );
    }

    revalidatePath(criteriaPath);

    return success("Criterion updated.");
  } catch (error) {
    console.error("Failed to update criterion", error);

    return failure(
      "Something went wrong while updating the criterion. Please try again."
    );
  }
};

const deleteCriterion: DeleteCriteriaAction = async ({ id }) => {
  "use server";

  const parsed = deleteCriteriaSchema.safeParse({ id });

  if (!parsed.success) {
    return failure(
      "We couldn't delete this criterion. Please try again.",
      parseFieldErrors(parsed.error)
    );
  }

  try {
    const [deleted] = await db
      .delete(criteriaTable)
      .where(eq(criteriaTable.id, parsed.data.id))
      .returning({ id: criteriaTable.id });

    if (!deleted) {
      return failure(
        "This criterion has already been removed or could not be found."
      );
    }

    revalidatePath(criteriaPath);

    return success("Criterion deleted.");
  } catch (error) {
    console.error("Failed to delete criterion", error);

    return failure(
      "Something went wrong while deleting the criterion. Please try again."
    );
  }
};

export default async function CriteriaPage() {
  const criteria = await db
    .select()
    .from(criteriaTable)
    .orderBy(asc(criteriaTable.name));

  return (
    <main className="mx-auto flex min-h-screen h-full w-full flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Evaluation Criteria</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Create, update, and remove the criteria used to score your evaluation
          runs.
        </p>
      </header>

      <CriteriaManager
        criteria={criteria}
        createAction={createCriterion}
        updateAction={updateCriterion}
        deleteAction={deleteCriterion}
      />
    </main>
  );
}
