import EvaluationRunner from "@/components/evaluations/evaluation-runner";

export default async function EvaluationPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Evaluation Benchmark</h1>
        <p className="text-sm text-neutral-500">
          Chat prompt: <span className="font-medium">Create this layout</span>
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Comparison</h2>
        <EvaluationRunner />
      </section>
    </main>
  );
}
