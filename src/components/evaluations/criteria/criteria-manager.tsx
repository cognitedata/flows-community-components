"use client";

import { useEffect, useId, useMemo, useState, useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/cognite/alert-dialog";
import { Button } from "@/components/ui/cognite/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/cognite/dialog";
import { Input } from "@/components/ui/cognite/input";
import { Label } from "@/components/ui/cognite/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/cognite/table";
import { Textarea } from "@/components/ui/cognite/textarea";
import type {
  CreateCriteriaAction,
  CriteriaActionState,
  CriterionFormValues,
  DeleteCriteriaAction,
  UpdateCriteriaAction,
} from "@/types/evaluations/criteria";
import { cn } from "@/lib/utils";

type Criterion = {
  id: number;
  name: string;
  description: string;
  weight: number;
};

type CriteriaManagerProps = {
  criteria: Criterion[];
  createAction: CreateCriteriaAction;
  updateAction: UpdateCriteriaAction;
  deleteAction: DeleteCriteriaAction;
};

type CriteriaFormState = {
  name: string;
  description: string;
  weight: string;
};

type CriteriaFormErrors = Partial<
  Record<"name" | "description" | "weight", string>
>;

export default function CriteriaManager({
  criteria,
  createAction,
  updateAction,
  deleteAction,
}: CriteriaManagerProps) {
  const [feedback, setFeedback] = useState<CriteriaActionState | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CriteriaFormState>({
    name: "",
    description: "",
    weight: "",
  });
  const [createErrors, setCreateErrors] = useState<CriteriaFormErrors>({});
  const [createFormError, setCreateFormError] = useState<string | null>(null);
  const [isCreating, startCreate] = useTransition();
  const createFieldPrefix = useId();

  useEffect(() => {
    if (!createOpen) {
      setCreateErrors({});
      setCreateFormError(null);
    }
  }, [createOpen]);

  useEffect(() => {
    if (!feedback || feedback.status === "error") {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const hasCriteria = criteria.length > 0;

  const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CriterionFormValues = {
      name: createForm.name,
      description: createForm.description,
      weight: normaliseWeight(createForm.weight),
    };

    startCreate(async () => {
      const result = await createAction(payload);
      const resultWithMessage = withMessage(
        result,
        "We couldn't create this criterion. Check the highlighted fields and try again.",
      );

      if (resultWithMessage.status === "success") {
        setFeedback(resultWithMessage);
        setCreateForm({ name: "", description: "", weight: "" });
        setCreateErrors({});
        setCreateFormError(null);
        setCreateOpen(false);
        return;
      }

      setFeedback(resultWithMessage);
      setCreateErrors(result.fieldErrors ?? {});
      setCreateFormError(resultWithMessage.message ?? null);
    });
  };

  const handleCreateFieldChange = (
    field: keyof CriteriaFormState,
    value: string,
  ) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const dismissFeedback = () => setFeedback(null);

  return (
    <Card className="w-full">
      <CardHeader className="border-b pb-6">
        <div>
          <CardTitle>Criteria</CardTitle>
          <CardDescription>
            Manage the evaluation criteria that power your benchmark results.
          </CardDescription>
        </div>

        <CardAction>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Add Criterion</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new criterion</DialogTitle>
                <DialogDescription>
                  Define the criteria name, the intent, and how heavily it should
                  influence scoring.
                </DialogDescription>
              </DialogHeader>

              <form
                className="flex flex-col gap-4"
                onSubmit={handleCreateSubmit}
              >
                <CriteriaFormFields
                  idPrefix={createFieldPrefix}
                  values={createForm}
                  errors={createErrors}
                  onChange={handleCreateFieldChange}
                  disabled={isCreating}
                />

                {createFormError && (
                  <p className="text-sm text-destructive" role="alert">
                    {createFormError}
                  </p>
                )}

                <DialogFooter className="mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create criterion"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 py-6">
        {feedback?.message && (
          <div
            role={feedback.status === "error" ? "alert" : "status"}
            className={cn(
              "flex items-start gap-3 rounded-md px-4 py-2 text-sm transition-opacity",
              feedback.status === "error"
                ? "border border-destructive/40 bg-destructive/5"
                : "border border-emerald-500/40 bg-emerald-500/5",
            )}
            data-state={feedback.status}
          >
            <span
              className={
                feedback.status === "error"
                  ? "text-destructive font-medium"
                  : "text-emerald-700 font-medium"
              }
            >
              {feedback.status === "error" ? "Heads up" : "Done"}
            </span>
            <span className="flex-1 text-muted-foreground">
              {feedback.message}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissFeedback}
              className="text-muted-foreground"
            >
              Dismiss
            </Button>
          </div>
        )}

        {hasCriteria ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion) => (
                <CriteriaRow
                  key={criterion.id}
                  criterion={criterion}
                  updateAction={updateAction}
                  deleteAction={deleteAction}
                  onFeedback={(state) => setFeedback(state)}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState onAddClick={() => setCreateOpen(true)} />
        )}
      </CardContent>
    </Card>
  );
}

type CriteriaRowProps = {
  criterion: Criterion;
  updateAction: UpdateCriteriaAction;
  deleteAction: DeleteCriteriaAction;
  onFeedback: (state: CriteriaActionState) => void;
};

function CriteriaRow({
  criterion,
  updateAction,
  deleteAction,
  onFeedback,
}: CriteriaRowProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState<CriteriaFormState>({
    name: criterion.name,
    description: criterion.description,
    weight: criterion.weight.toString(),
  });
  const [updateErrors, setUpdateErrors] = useState<CriteriaFormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isUpdating, startUpdate] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const fieldPrefix = useMemo(
    () => `criterion-${criterion.id}`,
    [criterion.id],
  );

  useEffect(() => {
    setUpdateForm({
      name: criterion.name,
      description: criterion.description,
      weight: criterion.weight.toString(),
    });
  }, [criterion]);

  useEffect(() => {
    if (!isDialogOpen) {
      setUpdateErrors({});
      setFormError(null);
      setUpdateForm({
        name: criterion.name,
        description: criterion.description,
        weight: criterion.weight.toString(),
      });
    }
  }, [isDialogOpen, criterion]);

  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      id: criterion.id,
      name: updateForm.name,
      description: updateForm.description,
      weight: normaliseWeight(updateForm.weight),
    };

    startUpdate(async () => {
      const result = await updateAction(payload);
      const resultWithMessage = withMessage(
        result,
        "We couldn't update this criterion. Check the highlighted fields and try again.",
      );

      if (resultWithMessage.status === "success") {
        onFeedback(resultWithMessage);
        setDialogOpen(false);
        return;
      }

      onFeedback(resultWithMessage);
      setUpdateErrors(result.fieldErrors ?? {});
      setFormError(resultWithMessage.message ?? null);
    });
  };

  const handleDelete = () => {
    startDelete(async () => {
      const result = await deleteAction({ id: criterion.id });
      onFeedback(
        withMessage(
          result,
          "We couldn't delete this criterion. Please try again.",
        ),
      );
    });
  };

  const handleFieldChange = (
    field: keyof CriteriaFormState,
    value: string,
  ) => {
    setUpdateForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{criterion.name}</TableCell>
      <TableCell className="max-w-lg">
        <p className="line-clamp-2 text-muted-foreground">
          {criterion.description}
        </p>
      </TableCell>
      <TableCell>{criterion.weight}</TableCell>
      <TableCell className="w-40">
        <div className="flex items-center justify-end gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit criterion</DialogTitle>
                <DialogDescription>
                  Update the criterion details and save your changes.
                </DialogDescription>
              </DialogHeader>

              <form
                className="flex flex-col gap-4"
                onSubmit={handleUpdateSubmit}
              >
                <CriteriaFormFields
                  idPrefix={fieldPrefix}
                  values={updateForm}
                  errors={updateErrors}
                  onChange={handleFieldChange}
                  disabled={isUpdating}
                />

                {formError && (
                  <p className="text-sm text-destructive" role="alert">
                    {formError}
                  </p>
                )}

                <DialogFooter className="mt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDialogOpen(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting || isUpdating}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete &ldquo;{criterion.name}&rdquo;?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove the criterion from future evaluation runs.
                  You can always re-create it later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}

type CriteriaFormFieldsProps = {
  idPrefix: string;
  values: CriteriaFormState;
  errors: CriteriaFormErrors;
  onChange: (field: keyof CriteriaFormState, value: string) => void;
  disabled?: boolean;
};

function CriteriaFormFields({
  idPrefix,
  values,
  errors,
  onChange,
  disabled,
}: CriteriaFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-name`}>Name</Label>
        <Input
          id={`${idPrefix}-name`}
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="e.g. Accuracy"
          disabled={disabled}
          required
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && (
          <span className="text-sm text-destructive">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-description`}>Description</Label>
        <Textarea
          id={`${idPrefix}-description`}
          value={values.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Describe what this criterion measures"
          disabled={disabled}
          rows={4}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && (
          <span className="text-sm text-destructive">
            {errors.description}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-weight`}>Weight</Label>
        <Input
          id={`${idPrefix}-weight`}
          type="number"
          inputMode="numeric"
          value={values.weight}
          onChange={(event) => onChange("weight", event.target.value)}
          placeholder="0"
          disabled={disabled}
          aria-invalid={Boolean(errors.weight)}
        />
        <span className="text-xs text-muted-foreground">
          Use a whole number to express how important this criterion is relative
          to the others.
        </span>
        {errors.weight && (
          <span className="text-sm text-destructive">{errors.weight}</span>
        )}
      </div>
    </div>
  );
}

type EmptyStateProps = {
  onAddClick: () => void;
};

function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-muted-foreground/30 px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground max-w-md">
        You have not added any criteria yet. Create your first criterion to
        start capturing how you want to measure evaluation runs.
      </p>
      <Button size="sm" onClick={onAddClick}>
        Add your first criterion
      </Button>
    </div>
  );
}

function normaliseWeight(value: string): number {
  if (value.trim().length === 0) {
    return Number.NaN;
  }

  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function withMessage(
  state: CriteriaActionState,
  fallback: string,
): CriteriaActionState {
  if (state.message) {
    return state;
  }

  return {
    ...state,
    message: fallback,
  };
}
