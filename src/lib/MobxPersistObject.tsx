import { toJS, autorun } from 'mobx';
import { set } from 'mobx';
import { OfflineStorage } from './LocalStorage';

export const MobxPersistObject = async (key, observableInstance) => {
  const v = await OfflineStorage.getItem(key);
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
    OfflineStorage.setItem(key, toJS(observableInstance));
  });
};
