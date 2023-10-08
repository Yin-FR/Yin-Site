import React, { useEffect, useState } from "react";

import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

interface PieDataItem {
  name: string,
  value: number
}

interface Props {
  renderedElementId: string;
  dataset: Array<PieDataItem>
}

const PieEChart: React.FC<Props> = ({ renderedElementId, dataset }) => {
  useEffect(() => {
    let chartDom = document.getElementById(renderedElementId)!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        show: false,
      },
      legend: {
        show: true,
        top: 'middle',
        left: 0,
        orient: "vertical",
        textStyle: {
          fontSize: 10
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '80%'],
          center: ['70%', '50%'],
          avoidLabelOverlap: true,
          label: {
            show: false,
            position: "center",
            formatter(param) {
              return param.name + ': ' + param.value + ' (' + parseFloat((param.percent as number).toFixed(1)) + '%)';
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 10,
            }
          },
          labelLine: {
            show: false
          },
          data: dataset
        }
      ]
    };
    

    option && myChart.setOption(option);
  }, []);

  return (
    <div id={renderedElementId} className="pie-chart-element"></div>
  )
}


export default PieEChart;