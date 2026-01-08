import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'

const AppLayout = () => (WrappedComponent) => {
  return (props) => (
    <>
      <Title title={"Chat App"} />
      <Header />
      <Grid container sx={{ height: 'calc(100vh - 4rem)' }}>
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
          first
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
          <WrappedComponent {...props} />
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
            bgcolor: "rgba(0,0,0,0.85)"
          }}
        >
          third
        </Grid>
      </Grid>
    </>
  )
}

export default AppLayout
