import { PortalHost } from '@/components/portal/host.tsx';
import type { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};

const Portal = (props: Props) => {
  const { children } = props;

  return (
    <>
      {children}
      <PortalHost />
    </>
  );
};

export default Portal;
