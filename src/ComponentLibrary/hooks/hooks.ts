import { useEffect, EffectCallback } from 'react';

// useMountEffect is a React hook similar to the componentDidMount method of a React Component class
export const useMountEffect = (effect: EffectCallback) => useEffect(effect, []);
