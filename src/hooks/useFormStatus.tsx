// src/hooks/useFormStatus.ts
import { useState } from "react";

export function useFormStatus() {
  const [pending, setPending] = useState(false);

  const startPending = () => setPending(true);
  const stopPending = () => setPending(false);

  return { pending, startPending, stopPending };
}
