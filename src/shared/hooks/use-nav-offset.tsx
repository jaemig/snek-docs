import { useMemo } from 'react';
import { useAuthentication } from '@snek-at/jaen';

export function useNavOffset() {
  const auth = useAuthentication();

  const navTopOffset = useMemo(() => {
    return auth.isAuthenticated ? '3.5rem' : '0rem';
  }, [auth.isAuthenticated]);
  return navTopOffset;
}
