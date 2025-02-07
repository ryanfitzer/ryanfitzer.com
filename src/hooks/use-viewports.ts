import { useCallback, useEffect, useState } from 'react';
import viewportjs from 'viewportjs';

const viewportConfig = {
  sm: 0,
  md: '50.5625rem',
  lg: '59.375em',
};

type ViewportNames = keyof typeof viewportConfig;
type ViewportList = Record<ViewportNames, boolean>;
export type UseVPState = viewportjs.ViewportInstance & {
  viewports: ViewportList;
};

const viewports = Object.entries(viewportConfig).map(([name, size]) => ({
  name,
  query: `(min-width: ${size})`,
}));

const createHookState = (vpq: viewportjs.ViewportInstance) => {
  const states = vpq.state() as viewportjs.ViewportState[];

  const vpList = states.reduce((accum, vp) => {
    accum[vp.name as ViewportNames] = vp.current;
    return accum;
  }, {} as ViewportList);

  return {
    viewports: vpList,
    ...vpq,
  };
};

export function useViewports(config = viewports) {
  const vpq = viewportjs(config);
  const [vps, setState] = useState<UseVPState>();
  const subscriber = useCallback(() => {
    return vpq(() => {
      setState(createHookState(vpq));
    });
  }, [vpq]);

  useEffect(subscriber, [subscriber]);

  return vps;
}
