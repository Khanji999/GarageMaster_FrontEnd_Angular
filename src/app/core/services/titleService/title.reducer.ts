import { createReducer, on } from '@ngrx/store';
import { setTitle } from './title.actions';

export interface TitleState {
    title: string;
  }
  
  const initialState: TitleState = {
    title: ''
  };
  
  export const titleReducer = createReducer(
    initialState,
    on(setTitle, (state, { title }) => ({ ...state, title }))
  );