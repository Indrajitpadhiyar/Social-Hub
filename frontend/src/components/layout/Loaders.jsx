import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const Loaders = () => {
    return (
        <Grid container sx={{ height: 'calc(100vh - 4rem)', spacing: "1rem" }}>
            <Grid
                size={{
                    xs: 0,
                    sm: 4,
                    md: 3
                }}
                height="100%"
                bgcolor="lightgray"
                sx={{
                    display: { xs: 'none', sm: 'block' }
                }}
            >
                <Skeleton variant='rectangular' />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 8,
                    md: 5,
                    lg: 6
                }}
                height="100%"
            >
                <Skeleton variant='rectangular' />
            </Grid>
            <Grid
                size={{
                    md: 4,
                    lg: 3
                }}
                height="100%"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    padding: "2rem",
                    // bgcolor: "rgba(0,0,0,0.85)"
                }}
            >
                <Skeleton variant='rectangular' />
            </Grid>
        </Grid>
    )
}

export default Loaders
