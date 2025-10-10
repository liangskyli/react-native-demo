import { createLRUCache } from '@/components/cache/lru-cache.ts';
import { useState } from 'react';

export function useCreateLRUCache<K extends {}, V extends {}, FC = unknown>(
  instanceId: string,
  options?: Parameters<typeof createLRUCache<K, V, FC>>[1],
) {
  const [cache] = useState(() => {
    return createLRUCache<K, V, FC>(instanceId, options);
  });

  return cache;
}
