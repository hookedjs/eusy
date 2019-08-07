import { observable } from 'mobx';

export const SidebarSectionState = observable({
  toggled: true,
  sidebarComponent: null
});
