import { FC, PropsWithChildren } from 'react';
import { Box, Grid, Typography } from "@mui/material";

interface Props {
    title: string;
}

export const SectionForm: FC<PropsWithChildren<Props>> = ({ title, children }) => {
    return (
        <Grid pt={1} mb={2}>
            <Box pb={1}>
                <Typography variant="overline">
                    {title}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </Grid>
    )
}