import { action, observable, set } from 'mobx';
import { Dimensions } from 'react-native';
import { getViewportInfo } from './lib/getViewportInfo';
import { MobxPersistClass } from './lib/MobxPersistClass';

class GlobalStateClass {
  persistedFields = ['user', 'sidebarToggled'];
  isHydrated = false;

  @observable
  user = {
    id: '',
    token: '',
    roles: []
  };

  @action
  logout = async () => {
    this.user = {
      id: '',
      token: '',
      roles: []
    };
  };

  @observable
  currentPageTitle = '';

  @observable
  sidebarToggled = true;
  @observable
  sidebarComponent = null;

  @observable
  search: string = '';

  @observable
  viewportInfo = getViewportInfo();
  @action
  refreshViewportInfo = () => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    if (width != this.viewportInfo.width || height != this.viewportInfo.height)
      set(this.viewportInfo, getViewportInfo());
  };
}
export const GlobalState = new GlobalStateClass();
MobxPersistClass(GlobalState);

setInterval(() => {
  GlobalState.refreshViewportInfo();
}, 400);
