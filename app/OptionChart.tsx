'use client'

import ReactECharts from 'echarts-for-react';

type OptionChartProp = {
  resultList: number[][]
  darkMode: boolean
}

export default function OptionChart({resultList, darkMode}: OptionChartProp ) {

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
    series: {
      type: 'line',
      showSymbol: false,
      clip: true,
      data: resultList,
      lineStyle: {color: '#ffffff'}
    }
  }

  return (
    <ReactECharts 
      style={{
        height: '100%',
        width: '100%',
      }} 
      option={option}
      theme={darkMode ? 'dark' : 'light'}
    />
  )
}