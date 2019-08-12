import { observable, set } from 'mobx';

const UserStateDefault = {
  roles: [],
  nameFirst: '',
  nameLast: '',
  email: ''
};

export const UserState = observable(UserStateDefault);

export const UserStateReset = () => {
  set(UserState, UserStateDefault);
};
