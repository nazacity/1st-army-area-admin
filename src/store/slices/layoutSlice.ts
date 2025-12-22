import { createSlice } from '@reduxjs/toolkit';
import { ISnackBarProps } from 'components/basecomponents/basesnackbar/BaseSnackbar';

const initialState = {
  sideBarOpen: false,
  snackbar: {
    open: false,
    severity: 'success',
    message: '',
  } as ISnackBarProps,
  organizationView: 'branch',
  patientView: 'information',
  inventoryView: 'all_inventory',
  productView: 'all_product',
  settingsView: 'permission',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleSideBar(state, action) {
      state.sideBarOpen = action.payload;
    },
    handleShowSnackbar(
      state,
      action: {
        type: string;
        payload: ISnackBarProps;
      }
    ) {
      state.snackbar = action.payload;
    },
    handleCloseSnackbar(state) {
      state.snackbar.open = false;
    },
    setOrganizationView(state, action) {
      state.organizationView = action.payload;
    },
    setPatientView(state, action) {
      state.patientView = action.payload;
    },
    setInventoryView(state, action) {
      state.inventoryView = action.payload;
    },
    setProductView(state, action) {
      state.productView = action.payload;
    },
    setSettingsView(state, action) {
      state.settingsView = action.payload;
    },
  },
});

export const {
  handleSideBar,
  handleShowSnackbar,
  handleCloseSnackbar,
  setOrganizationView,
  setPatientView,
  setInventoryView,
  setProductView,
  setSettingsView,
} = layoutSlice.actions;

export default layoutSlice.reducer;
