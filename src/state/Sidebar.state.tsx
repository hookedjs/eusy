import { observable } from 'mobx';

export const SidebarState = observable({
  toggled: true,
  sidebarComponent: null
});
