import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TitleState } from './title.reducer';

export const selectTitleState = createFeatureSelector<TitleState>('title');
export const selectTitle = createSelector(selectTitleState, (state) => state.title);
