import { useEffect, useState } from 'react';
import viewportjs from 'viewportjs';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '~/tailwind.config';

const twConfig = resolveConfig(tailwindConfig);

type ViewportNames = keyof typeof twConfig.theme.screens;
type ViewportList = Record<ViewportNames, boolean>;
export type UseVPState = viewportjs.ViewportInstance & {
  viewports: ViewportList;
};

const viewports = Object.entries(twConfig.theme.screens).map(
  ([name, size]) => ({
    name,
    query: `(min-width: ${size})`,
  })
);

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

export function useViewports() {
  const [vps, setState] = useState<UseVPState>();

  useEffect(() => {
    const vpq = viewportjs(viewports);

    const unsubscribe = vpq(() => {
      setState(createHookState(vpq));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return vps;
}
