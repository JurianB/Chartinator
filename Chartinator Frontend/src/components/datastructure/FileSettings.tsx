import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { IFileOptions } from '../../core/interfaces/datastructure/IFileOptions';

interface IFileSettings {
  option: IFileOptions
  onChange: (filePath: string, label: string, checked: boolean) => void;
}

export default function FileSettings(props: IFileSettings) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.id, props.option.label, event.target.checked);
  };

  return (
    <FormControlLabel control={<Checkbox onChange={onChange} checked={props.option.checked} id={props.option.id} />} label={props.option.label} />
  )
}
