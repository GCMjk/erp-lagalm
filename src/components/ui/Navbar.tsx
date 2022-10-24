import NextLink from "next/link"

import { AppBar, Toolbar, Link, Typography, Button, Box, IconButton } from "@mui/material"
import { Home, RecentActors, FacebookRounded, LinkedIn, MenuRounded } from '@mui/icons-material'

export const navNavbar = [
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

export const Navbar = () => {
  return (
    <nav>
      <AppBar>
        <Toolbar>

          <NextLink href='/' passHref>
            <Link>
              <Typography>Lagalm</Typography>
            </Link>
          </NextLink>

          <Box flex={1} />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navNavbar.map(({ text, href, icon }) => (
              <NextLink key={href} href={href} passHref>
                <Link>
                  <Button>
                    {text}
                  </Button>
                </Link>
              </NextLink>
            ))}
          </Box>

          <Box flex={1} />

          <IconButton>
            <FacebookRounded />
          </IconButton>

          <IconButton>
            <LinkedIn />
          </IconButton>

          <Button sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <MenuRounded />
          </Button>


        </Toolbar>
      </AppBar>
    </nav>
  )
}