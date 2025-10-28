function App() {
  return (
    <div className="min-w-screen min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center px-8">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
            Cognite
          </span>
        </h1>
        <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
          Build powerful industrial applications with Cognite Data Fusion
        </p>
        <a
          href="https://refactored-couscous-5l9mkl3.pages.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white text-xl px-12 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          View Documentation →
        </a>
      </div>
    </div>
  );
}

export default App;
