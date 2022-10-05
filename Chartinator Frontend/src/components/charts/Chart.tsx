import { Box } from '@mui/material'
import React from 'react'
import { IChartDataInfo } from '../../core/interfaces/chart/IChartDataInfo'
import ViewBox from '../controls/ViewBox'
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

interface IChart {
  data: IChartDataInfo
}
export default function Chart(props: IChart) {
  const data = {
    labels: props.data.labels,
    datasets: props.data.dataSets
  };

  const options = {
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true // SET SCROOL ZOOM TO TRUE
          },
          mode: "xy",
          speed: 5000
        },
        pan: {
          enabled: true,
          mode: "xy",
          speed: 5000
        }
      },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.data.title,
      },
    },
    animation: false,
    spanGaps: true,
    elements: {
      point: {
        radius: 0 // default to disabled in all datasets
      }
    },
    scales: {
      x:{
        min: props.data.XMin,
        max: props.data.XMax
      },
      y:{
        min: props.data.YMin,
        max: props.data.YMax
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <ViewBox width='flexGrow' heightCorrection={180}>
        <Line options={options} data={data} />
      </ViewBox>
    </Box>
  )
}

// https://react-chartjs-2.js.org/examples/line-chart