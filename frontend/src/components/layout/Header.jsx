import React, { Suspense, useState, useEffect, lazy } from 'react'
import { AppBar, Box, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcone from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { orange } from '../constants/color.js';


const SearchDialog = lazy(() => import('../specific/Search'));
const NewGroupDialog = lazy(() => import('../specific/NewGroups.jsx'));
const NotificationDialog = lazy(() => import('../specific/Notification'));

const Header = () => {


  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setMobile((prev) => !prev);
    console.log("mobile menu clicked");
  }
  const openSearch = () => {
    setIsSearch((prev) => !prev);
    console.log("search dialog opened");
  }
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    console.log("new group dialog opened");
  }

  const openNotification = () => {
    setIsNotification((prev) => !prev);
    console.log("notification dialog opened");
  }

  const navigateToGroups = () => {

    navigate('/groups');
  }

  const logOutHandler = () => {
    console.log("logout clicked");
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position="static" sx={{
          height: '100%',
          bgcolor: orange,
        }}>

          <Toolbar>
            <Typography
              variant='h6'
              sx={{
                display: { xs: "none", sm: "block" }
              }}
            >
              Chattu
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" }
              }}
            >
              <IconButton
                color='inherit'
                onClick={handleMobile}>
                <MenuIcone />
              </IconButton>

            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            />

            <Box>

              <IconeBtn
                title="search"
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconeBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconeBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                onClick={navigateToGroups}
              />
              <IconeBtn
                title="Notification"
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconeBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={logOutHandler}
              />

            </Box>

          </Toolbar>

        </AppBar>
      </Box>

      {
        isSearch && (
          <Suspense fallback={<div>Loading...</div>}>
            <SearchDialog />
          </Suspense>
        )
      }
      {
        isNewGroup && (
          <Suspense fallback={<div>Loading...</div>}>
            <NewGroupDialog />
          </Suspense>
        )
      }
      {
        isNotification && (
          <Suspense fallback={<div>Loading...</div>}>
            <NotificationDialog />
          </Suspense>
        )
      }
    </>
  )
}


const IconeBtn = ({ title, icon, onClick }) => (
  <Tooltip title={title}>
    <IconButton
      color='inherit'
      size='large'
      onClick={onClick}>
      {icon}
    </IconButton>
  </Tooltip>
)

export default Header
