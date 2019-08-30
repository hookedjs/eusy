import { action, autorun } from 'mobx';
import { LocalStorage } from './LocalStorage';

export const MobxPersistClass = action(async (store: any) => {
  for (let fieldName of store.persistedFields || []) {
    const storageKey = `${store.constructor.name}.${fieldName}`;
    console.log(`mobx.StoreWrapper.hydrate: Hydrating ${storageKey}`);
    // @ts-ignore: Hydrate no index signature
    const storedValue = JSON.parse((await LocalStorage.getItem(storageKey)) as any);
    if (storedValue) store[fieldName] = storedValue;
    autorun(() => {
      // console.log(`mobx.StoreWrapper.hydrate: Setting ${storageKey} to ${store[fieldName]}`);
      // @ts-ignore: Hydrate no index signature
      LocalStorage.setItem(storageKey, JSON.stringify(store[fieldName]));
    });
  }
  store.isHydrated = true;
});
