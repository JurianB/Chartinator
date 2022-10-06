import { Box } from '@mui/material';
import React from 'react';
import { IChartDataInfo } from '../../core/interfaces/chart/IChartDataInfo';
import ViewBox from '../controls/ViewBox';
import { CanvasJSChart } from 'canvasjs-react-charts';

interface IChart {
  data: IChartDataInfo
}
export default function Chart(props: IChart) {
  const options = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: props.data.title,
      fontSize: 24,
      padding:{
        top: 20
      }
    },
    data: props.data.data,
    height: 600
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <ViewBox width='flexGrow' heightCorrection={180}>
        <CanvasJSChart options={options} />
      </ViewBox>
    </Box>
  )
}