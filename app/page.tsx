// app/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

// 1. Rename your main component internally
function WorkspaceContent() {
  const searchParams = useSearchParams();
  const activeTool = searchParams.get('tool') || 'business';
  
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  useEffect(() => {
    setInputVal('');
    setOutput('');
  }, [activeTool]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTool, query: inputVal }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutput(data.result);
    } catch (err: any) {
      setOutput(`⚠️ System Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ... keep the entire existing return block exactly the same ... */}
    </div>
  );
}

// 2. Export a default wrapper component that handles the Suspense state
export default function WorkspacePage() {
  return (
    <Suspense fallback={<div className="text-slate-500 text-sm">Loading studio workspace...</div>}>
      <WorkspaceContent />
    </Suspense>
  );
}