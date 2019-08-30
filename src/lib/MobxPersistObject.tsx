import { toJS, autorun } from 'mobx';
import { set } from 'mobx';
import { LocalStorage } from './LocalStorage';

export const MobxPersistObject = async (key, observableInstance) => {
  const v = await LocalStorage.getItem(key);
  if (v) {
    // if (observableInstance.replace) observableInstance.replace(v);
    // else if (typeof v === "object") {
    //   Object.keys(v).forEach((k) => (observableInstance[k] = v[k]));
    // } else observableInstance = v;
    set(observableInstance, v);
  }
  autorun(() => {
    // LocalStorage.setItem(key, change.object.toJSON());
    // LocalStorage.setItem(key, change.newValue);
    LocalStorage.setItem(key, toJS(observableInstance));
  });
};
