import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"

import { navNavbar } from "./Navbar"

export const Sidenav = () => {
	return (
		<Drawer
			open={false}
			anchor='left'
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
		>
			<Box sx={{ width: 280 }}>
				<List>
					{navNavbar.map(({ text, href, icon: Icon }) => (
						<ListItem key={href} sx={{ paddingLeft: 4 }} button>
							<ListItemIcon>
								<Icon />
							</ListItemIcon>
							<ListItemText>
								{text}
							</ListItemText>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	)
}