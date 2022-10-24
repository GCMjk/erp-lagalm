import { AppBar, Toolbar, Button, Box, IconButton, Badge, Avatar } from "@mui/material"
import { MenuRounded, NotificationsRounded } from '@mui/icons-material'

export const Header = () => {
  return (
    <header>
      <AppBar>
        <Toolbar>

          <Button>
            <MenuRounded />
          </Button>

          <Box flex={1} />

          <IconButton>
            <Badge badgeContent={2} color='error' >
              <NotificationsRounded />
            </Badge>
          </IconButton>

          <Avatar sx={{ margin: '0px 8px', width: 30, height: 30, bgcolor: 'primary' }}>N</Avatar>


        </Toolbar>
      </AppBar></header>
  )
}