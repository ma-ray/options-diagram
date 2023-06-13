'use client'

import ReactECharts from 'echarts-for-react';
import { OptionType } from './OptionType';

type OptionChartProp = {
  optionsList: OptionType[]
}

export default function OptionChart({optionsList}: OptionChartProp ) {

  const series = optionsList.map(op => ({
    type: 'line',
    showSymbol: false,
    clip: true,
    data: op.data,
    lineStyle: {color: op.colour}
  }));

  const option = {
    animation: false,
    grid: {
      top: 40,
      left: 50,
      right: 40,
      bottom: 50
    },
    xAxis: {
      name: 'x',
      min: -1000,
      max: 1000,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    yAxis: {
      name: 'y',
      min: -1000,
      max: 1000,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    dataZoom: [
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: -100,
        endValue: 100
      },
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: -100,
        endValue: 100
      }
    ],
    series
  }

  return (
    <ReactECharts 
      style={{
        height: '100%',
        width: '100%',
      }} 
      option={option}
      theme={'dark'}
    />
  )
}