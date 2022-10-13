import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

interface TextFileSettings {
  onChange: (id: string, checked: boolean) => void;

}
export default function TextFileSettings(props: TextFileSettings) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.id, event.target.checked);
  };

  return (
    <FormGroup row sx={{ paddingLeft: 2 }}>
      <FormControlLabel control={<Checkbox onChange={onChange} defaultChecked />} id='Molar mass' label="Molar mass" />
      <FormControlLabel control={<Checkbox onChange={onChange} />} id='rid1A/MMD' label="rid1A/MMD" />
      <FormControlLabel control={<Checkbox onChange={onChange} />} id='vwd1A/MMD'label="vwd1A/MMD" />
    </FormGroup>
  )
}
