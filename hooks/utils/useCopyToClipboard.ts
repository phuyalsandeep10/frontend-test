'use client';

import { useState, useCallback } from 'react';

export function useCopyToClipboard() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      setTimeout(() => setCopiedValue(null), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopiedValue(null);
      return false;
    }
  }, []);

  const isCopied = useCallback(
    (text: string) => {
      return copiedValue === text;
    },
    [copiedValue],
  );

  return { copyToClipboard, isCopied };
}
