import { observable, set } from 'mobx';

const UserStateDefault = {
  roles: [],
  nameFirst: '',
  nameLast: '',
  email: '',
  avatar: ''
};

export const UserState = observable(UserStateDefault);

export const UserStateReset = () => {
  set(UserState, UserStateDefault);
};
