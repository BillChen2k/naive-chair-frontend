/**
 * `useAppDispatch` and `useAppSelector` is used to avoid to import `RootState` every time.
 * Works the same as `useDispatch` and `useSelector`.
 * Reference https://redux.js.org/usage/usage-with-typescript
 */

import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import type {RootState, AppDispatch} from '@/store/index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

