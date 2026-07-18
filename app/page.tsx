return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold capitalize">{activeTool} Workspace</h1>
      <form onSubmit={handleGenerate} className="space-y-4">
        <textarea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter prompt text here..."
          className="w-full p-3 border rounded text-slate-900"
          rows={4}
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Generating...' : 'Run Generation'}
        </button>
      </form>
      {output && (
        <div className="mt-4 p-4 bg-slate-100 rounded border border-slate-200 text-slate-800 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );