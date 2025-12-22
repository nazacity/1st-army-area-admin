import { createTheme } from '@mui/material/styles';
import colors from './colors';
import shadows from './shadows';
import typography from './typography';
import _ from 'lodash';
import COLORS from './colors';
import SHADOW from './shadows';

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*::-webkit-scrollbar-track': {
        WebkitBoxShadow: 'inset 0 0 1px rgba(0,0,0,0.1)',
      },

      '*': {
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        margin: 0,
        padding: 0,
      },
      '#root': {
        height: '100%',
      },
      "*[dir='rtl'] .buyNowImg": {
        transform: 'scaleX(-1)',
      },

      '.buyNowImg': {
        position: 'absolute',
        right: '-44px',
        top: '-18px',
        width: '143px',
        height: '175px',
      },
      '.MuiCardHeader-action': {
        alignSelf: 'center !important',
      },
      '.scrollbar-container': {
        borderRight: '0 !important',
      },
      "*[dir='rtl'] .welcomebg:before": {
        backgroundPosition: 'top -24px left -9px !important',
      },
      a: {
        textDecoration: 'none',
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: '15px !important',
        paddingRight: '15px !important',
        maxWidth: '1600px',
      },
    },
  },

  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        boxShadow: 'none',
      },
      outlined: {
        borderColor: COLORS.grey[2],
        color: COLORS.grey[5],
        boxShadow: SHADOW[3],
        '&:hover': {
          backgroundColor: COLORS.grey[0],
          borderColor: COLORS.grey[2],
        },
      },
      contained: {
        borderColor: COLORS.primary,
        color: COLORS.white,
        boxShadow: SHADOW[3],
        '&:hover': {
          // backgroundColor: COLORS.primary,
          // borderColor: COLORS.grey[2],
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        color: COLORS.grey[2],
        fontWeight: 400,
        '&.Mui-selected': {
          fontWeight: 600,
        },
      },
    },
  },

  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: '9px',
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '5px',
        padding: '5px',
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: '40px',
      },
    },
  },

  MuiGridItem: {
    styleOverrides: {
      root: {
        paddingTop: '30px',
        paddingLeft: '30px !important',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: '#ecf0f2',
        borderRadius: '6px',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: '0',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: '500',
        fontSize: '0.75rem',
      },
    },
  },
  MuiDialog: { styleOverrides: { root: { zIndex: 10001 } } },
  MuiMenu: { styleOverrides: { root: { zIndex: 10002 } } },
};

export const SIZES = {
  SidebarWidth: 265,
  TopbarHeight: 70,
};

export const baseTheme = {
  direction: 'ltr',
  palette: colors,
  components,
  typography,
  shadows,
};

export const THEME = createTheme(_.merge(baseTheme));
