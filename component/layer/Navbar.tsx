'use client';

import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Box,
  Divider,
  Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const NavDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
  },
}));

const NavItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '4px',
  margin: '4px 8px',
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

const navigationItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'All Tracks', icon: <LibraryMusicIcon />, path: '/tracks' },
  { text: 'Add Track', icon: <AddBoxIcon />, path: '/tracks/create' }
];


interface NavbarProps {
  open: boolean;
  onClose: () => void;
}

function Navbar({ open, onClose }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    return (
        <NavDrawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
            keepMounted: true,
        }}
        >
        <DrawerHeader>
            <Typography variant="h6" color="black" fontWeight="bold">
            MusicCreate
            </Typography>
        </DrawerHeader>
        
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <List>
            {navigationItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <NavItem
                selected={pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                >
                <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontWeight: pathname === item.path ? 700 : 400 }}
                />
                </NavItem>
            </ListItem>
            ))}
        </List>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
        </NavDrawer>
    );
}

export default Navbar;
