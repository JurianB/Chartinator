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
    backgroundColor: "transparent",
    axisX:{
      lineThickness: 0,
      tickThickness: 0
    },
    axisY:{
      lineThickness: 0,
      gridThickness: 0,
      tickLength: 0
    },
    data:props.data.data,
    zoomEnabled: true,
    height: 700
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <ViewBox width='flexGrow' heightCorrection={180}>
        <CanvasJSChart options={options} />
      </ViewBox>
    </Box>
  )
}