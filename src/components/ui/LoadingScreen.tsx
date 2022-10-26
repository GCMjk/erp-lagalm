import { Box, CircularProgress, Typography } from "@mui/material"

export const LoadingScreen = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
        >
            <Typography sx={{ mb: 4 }} variant='h2' fontSize={20} fontWeight={400}>
                Cargando
            </Typography>
            <CircularProgress thickness={6} />
        </Box>
    )
}