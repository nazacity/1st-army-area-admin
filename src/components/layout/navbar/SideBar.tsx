import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { handleSideBar } from 'store/slices/layoutSlice';
import router from 'next/router';
import { sideNavbarPathes } from 'constants/noneDisplayPathes';
import PieChartIcon from '@mui/icons-material/PieChart';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { COLORS, SHADOW } from 'theme';
import { drawerConstant } from 'constants/drawer';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import authServices from 'services/auth.services';
import { useAppDispatch, useAppSelector } from 'store';
import ListAltIcon from '@mui/icons-material/ListAlt';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerConstant.open,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerConstant.close,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerConstant.open,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const IconFixed = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    left: drawerConstant.open - 20,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    left: drawerConstant.close - 20,
  }),
}));

const SideBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sideBarOpen = useAppSelector((state) => state.layout.sideBarOpen);
  const permission = useAppSelector(
    (state) => state.user.user?.permission?.section || []
  );

  const routePath = useMemo(() => {
    return router.pathname.split('/')[1];
  }, [router.pathname]);

  const checkPath = useMemo(() => {
    return sideNavbarPathes.some((path) => routePath === path);
  }, [router.pathname, sideNavbarPathes]);

  const { mutate: signout } = authServices.useMutationSignout(
    (data) => {
      if (data) {
        router.push('/');
      }
    },
    (error) => {}
  );

  const _HandleToggle = () => {
    dispatch(handleSideBar(!sideBarOpen));
  };

  const menuLists = useMemo(() => {
    const menu = [
      {
        label: t('common:side_bar.home'),
        icon: <PieChartIcon />,
        link: 'home',
      },
      {
        label: t('common:side_bar.user'),
        icon: <PeopleIcon />,
        link: 'user',
      },
      {
        label: t('common:side_bar.history'),
        icon: <ListAltIcon />,
        link: 'history',
      },
    ];

    return menu;
  }, [t, permission]);

  if (checkPath) {
    return <></>;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <IconFixed
        sx={{
          position: 'fixed',
          top: 80,
          width: 40,
          height: 40,
          bgcolor: '#fff',
          zIndex: 10000,
          boxShadow: SHADOW[3],
          borderRadius: 20,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: COLORS.primary.main,
        }}
        onClick={_HandleToggle}
        open={sideBarOpen}
      >
        {sideBarOpen ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
      </IconFixed>
      <Drawer anchor="left" variant="permanent" open={sideBarOpen}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
            <img
              src="/logo/logo2.png"
              alt="keenix-logo"
              style={{ width: 100 }}
            />
          </Box>
          <List>
            {menuLists.map((item) => {
              return (
                <ListItem
                  key={item.label}
                  disablePadding
                  onClick={() => {
                    router.push(`/${item.link}`);
                  }}
                >
                  <ListItemButton
                    disableRipple
                    sx={{
                      '&:hover': {
                        backgroundColor: COLORS.primary.light,
                      },
                      backgroundColor:
                        routePath === item.link ? COLORS.primary.light : 'none',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          routePath === item.link
                            ? COLORS.primary.main
                            : 'none',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box>
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                signout();
              }}
            >
              <ListItemButton
                disableRipple
                sx={{
                  '&:hover': {
                    backgroundColor: COLORS.background.blue_light,
                  },
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={t('common:auth.sign_out')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;
