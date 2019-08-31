import { action, autorun } from 'mobx';
import { OfflineStorage } from './OfflineStorage';

export const MobxPersistClass = action(async (store: any) => {
  for (let fieldName of store.persistedFields || []) {
    const storageKey = `${store.constructor.name}.${fieldName}`;
    console.log(`mobx.StoreWrapper.hydrate: Hydrating ${storageKey}`);
    // @ts-ignore: Hydrate no index signature
    // const storedValue = JSON.parse((await OfflineStorage.load({key: storageKey})) as any);
    // const storedValue = (await OfflineStorage.load({key: storageKey}) as any);
    const storedValue = JSON.parse((await OfflineStorage.getItem(storageKey)) as any);
    if (storedValue) store[fieldName] = storedValue;
    autorun(async () => {
      // console.log(`mobx.StoreWrapper.hydrate: Setting ${storageKey} to ${store[fieldName]}`);
      // @ts-ignore: Hydrate no index signature
      // OfflineStorage.save({key: storageKey, data: JSON.stringify(store[fieldName])});
      // await OfflineStorage.save({key: storageKey, data: store[fieldName]});
      OfflineStorage.setItem(storageKey, JSON.stringify(store[fieldName]));
    });
  }
  store.isHydrated = true;
});
