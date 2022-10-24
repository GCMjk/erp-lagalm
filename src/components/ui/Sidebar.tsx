import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader } from "@mui/material"
import { Home, RecentActors, Person, Settings, Logout } from '@mui/icons-material'

const navSidebar = [
  {
    text: 'Inicio',
    href: '/',
    icon: Home
  },
  {
    text: 'Contacto',
    href: '/contacto',
    icon: RecentActors
  }
]

export const Sidebar = () => {
  return (
    <Drawer
      open={false}
      anchor='left'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 280 }}>
        <List>
          {navSidebar.map(({ text, href, icon: Icon }) => (
            <ListItem key={href} sx={{ paddingLeft: 4 }} button>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
        <ListSubheader>Configuraciones</ListSubheader>

        <List>
          <ListItem sx={{ paddingLeft: 4 }} button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary='Perfil' />
          </ListItem>

          <ListItem sx={{ paddingLeft: 4 }} button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary='Configuración' />
          </ListItem>

          <ListItem sx={{ paddingLeft: 4 }} button>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary='Cerrar sesión' />
          </ListItem>

        </List>
      </Box>
    </Drawer>
  )
}