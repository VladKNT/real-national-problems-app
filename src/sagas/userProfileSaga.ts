import { put, call, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import ACTION from '../redux/actions/ActionTypes';
import UserResolver from '../api/graphql/relsolvers/user';
import { routeCurrentUser } from './commonSaga';


export function* getUser() {
  yield put({ type: ACTION.FETCH_USER_PROFILE_REQUESTING });
  const accessToken = yield call([AsyncStorage, 'getItem'], '@SessionStorage:accessToken');
  if (accessToken) {
    try {
      const user =  yield call(UserResolver.getUser);
      if (user){
        yield put({ type: ACTION.FETCH_USER_PROFILE_SUCCESS, user });
        return user;
      }

      return null;
    } catch (error) {
      yield put({ type: ACTION.FETCH_USER_PROFILE_ERROR, error });
      console.warn('Error getting user: ' + error);
    }
  } else {
    yield put({ type: ACTION.FETCH_USER_PROFILE_ERROR, error: 'Unauthorized' });
    console.warn('Error getting user: Unauthorized');
  }
}

export function* signUp(action: any) {
  try {
    const { email, password, firstName, lastName, username } = action;
    yield put({ type: ACTION.CREATE_USER_PROFILE_REQUESTING });

    const tokenPair =  yield call(UserResolver.signUp, { email, password, firstName, lastName, username });

    if (tokenPair) {
      yield AsyncStorage.setItem('@SessionStorage:accessToken', tokenPair.accessToken);
      yield AsyncStorage.setItem('@SessionStorage:refreshToken', tokenPair.refreshToken);
      yield call(routeCurrentUser);
    }
  } catch (error) {
    yield put({ type: ACTION.CREATE_USER_PROFILE_ERROR, error });
    console.warn('Sign up error ' + error);
  }
}

export function* signIn(action: any) {
  try {
    const { login, password } = action;
    yield put({ type: ACTION.LOGIN_USER_PROFILE_REQUESTING });

    const tokenPair =  yield call(UserResolver.signIn, { login, password });

    if (tokenPair) {
      yield AsyncStorage.setItem('@SessionStorage:accessToken', tokenPair.accessToken);
      yield AsyncStorage.setItem('@SessionStorage:refreshToken', tokenPair.refreshToken);

      yield call(routeCurrentUser);
      yield put({ type: ACTION.LOGIN_USER_PROFILE_SUCCESS });
    }
  } catch (error) {
    yield put({ type: ACTION.LOGIN_USER_PROFILE_ERROR, error });
    console.warn('Sign in error ' + error);
  }
}

export function* updateUserProfile(action: any) {
  try {
  const { id, username, firstName, lastName, imageFile, bio } = action;
  yield put({  type: ACTION. UPDATE_USER_PROFILE_REQUESTING });

  const user = yield call(UserResolver.updateUser, { id, username, firstName, lastName, imageFile, bio });

  if (user){
    yield put({ type: ACTION.UPDATE_USER_PROFILE_SUCCESS, user });
    return user;
  }

  return null;
  } catch (error) {
    yield put({ type: ACTION.UPDATE_USER_PROFILE_ERROR, error });
    console.warn('Update user profile error ' + error);
  }
}