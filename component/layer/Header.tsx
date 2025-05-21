'use client';

import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  alpha,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // <- Іконка профілю

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 500,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
}));

interface HeaderProps {
  toggleNav: () => void;
}

function Header({ toggleNav }: HeaderProps) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: (theme) => theme.palette.grey[800] }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleNav}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Link href="/" passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <Logo variant="h5" sx={{ color: 'white' }}>
                MusicCreate
              </Logo>
            </a>
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <Link href="./Auth" passHref legacyBehavior>
            <IconButton sx={{ ml: 1 }} color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;