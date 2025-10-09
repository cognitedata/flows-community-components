import EvaluationRunner from "@/components/evaluations/evaluation-runner";

export default async function EvaluationPage() {
  return (
    <main className="mx-auto flex w-full flex-col gap-6 px-6 py-10 min-h-screen h-full">
      <header className="space-y-2 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Evaluation Benchmark</h1>
      </header>

      <EvaluationRunner />
    </main>
  );
}
