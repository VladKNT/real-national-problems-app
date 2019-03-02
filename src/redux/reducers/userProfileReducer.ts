import ACTION from '../actions/ActionTypes';
import { AnyAction } from 'redux';
import { ReactNativeFileOptions } from 'extract-files';


export interface IUserProfile {
  firstName: string,
  lastName: string,
  profilePhoto: string | null,
  imageFile: ReactNativeFileOptions | null,
  bio: string
}

export interface IUser {
  email: string
  id: string
  userProfile: IUserProfile
  username: string
}

export interface IUserProfileReducer {
  user: IUser,
  loading: boolean,
  error: string
}

export const initUser = {
  id: '',
  username: '',
  email: '',
  userProfile: {
    firstName: '',
    lastName: '',
    profilePhoto: '',
    bio: ''
  }
};

const initialState = {
  user: initUser,

  loading: false,
  error: ''
};

export default function(state: IUserProfileReducer = initialState, action: AnyAction) {
  switch (action.type) {
    case ACTION.FETCH_USER_PROFILE_REQUESTING:
    case ACTION.UPDATE_USER_PROFILE_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case ACTION.FETCH_USER_PROFILE_SUCCESS:
    case ACTION.UPDATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loading: false,
      }
    }

    case ACTION.FETCH_USER_PROFILE_ERROR:
    case ACTION.UPDATE_USER_PROFILE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
  }

  return state;
}