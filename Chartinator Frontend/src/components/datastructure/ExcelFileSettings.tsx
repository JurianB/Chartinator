import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

interface IExcelFileSettings {
  onChange: (id: string, checked: boolean) => void;
}
export default function ExcelFileSettings(props: IExcelFileSettings) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.id, event.target.checked);
  };

  return (
    <FormGroup row sx={{ paddingLeft: 2 }}>
      <FormControlLabel control={<Checkbox onChange={onChange} id='section 1' />} label="Section 1" />
      <FormControlLabel control={<Checkbox onChange={onChange} id='section 2' defaultChecked />} label="Section 2" />
    </FormGroup>
  )
}
