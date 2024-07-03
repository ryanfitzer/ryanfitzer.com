import { useCallback, useEffect, useState } from 'react';
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

export function useViewports(config = viewports) {
  const vpq = viewportjs(config);
  const [vps, setState] = useState<UseVPState>();
  const subscriber = useCallback(() => {
    return vpq(() => {
      setState(createHookState(vpq));
    });
  }, []);

  useEffect(subscriber, []);

  return vps;
}
