import { useState } from "react";

type Poll = { id: string; title: string; votes: number };

export function usePolls(initial: Poll[] = []) {
  const [polls, setPolls] = useState<Poll[]>(initial);

  function add(p: { id: string; title: string; votes?: number }) {
    setPolls((s) => [...s, { votes: 0, ...p }]);
  }

  return { polls, add, setPolls } as const;
}
