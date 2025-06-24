'use client'

import { Box, Typography, Container } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'white',
        color: 'black',
        borderTop: 2,
        borderColor: 'black'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          align="center"
          sx={{
            fontStyle: 'bold',
            fontFamily: 'Raleway, sans-serif',
            '& span': {
              fontSize: '0.875rem',
              display: 'block',
              mt: 1,
              opacity: 0.8
            }
          }}
        >
          "Last year was the moment to start, but today will have to do."
          <span>- Chris Guillebeau</span>
        </Typography>
      </Container>
    </Box>
  )
}