import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function MyBackDrop({open,percentage}) {

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
       
      >
        <div>
        <CircularProgress color="inherit" />
          {(percentage)?<div style={{fontSize:'2rem'}}>
            {percentage} %</div>:""}
        </div>

      </Backdrop>
  )
}
