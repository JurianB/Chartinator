import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export default function TextFileSettings() {
  return (
    <FormGroup row sx={{ paddingLeft: 2 }}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Molar mass" />
      <FormControlLabel control={<Checkbox />} label="rid1A/MMD" />
      <FormControlLabel control={<Checkbox />} label="vwd1A/MMD" />
    </FormGroup>
  )
}
