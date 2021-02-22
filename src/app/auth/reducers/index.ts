import {createReducer, on} from '@ngrx/store';
import {User} from '../model/user.model';
import {AuthActions} from '../action-types';
import {login} from '../auth.actions';

export interface AuthState {
  user: User ;
}

export const initialAuthState: AuthState = {
  user: undefined
};


// reducer function pass to store so it knows how to react to a given function
// takes current and new action and calculates new state

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    };
  })

);
