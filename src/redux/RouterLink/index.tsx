import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const RouterLinkIS = () => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  return url.pathname.split('/')[2] || '';
}

export const RouterLinkSlice = createSlice({
  name: 'RouterLinkSlice',
  initialState: RouterLinkIS(),
  reducers: {
    setRouterLinkStore: ({}, action: PayloadAction<string>) => action.payload,
    resetRouterLinkStore: () => RouterLinkIS()
  }
});

export const {
  setRouterLinkStore,
  resetRouterLinkStore
} = RouterLinkSlice.actions;
