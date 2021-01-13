import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-tempo-geekie-chart',
  templateUrl: './tempo-geekie-chart.component.html',
  styleUrls: ['./tempo-geekie-chart.component.css']
})
export class TempoGeekieChartComponent implements OnInit {

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
  }


}
