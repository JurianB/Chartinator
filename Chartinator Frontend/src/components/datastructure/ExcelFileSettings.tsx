import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export default function ExcelFileSettings() {
  return (
    <FormGroup row sx={{ paddingLeft: 2 }}>
      <FormControlLabel control={<Checkbox />} label="Section 1" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Section 2" />
    </FormGroup>
  )
}
