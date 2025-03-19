import { createAction, props } from '@ngrx/store';

export const setTitle = createAction(
    '[Title] Set Title',
    props<{ title: string }>()
);