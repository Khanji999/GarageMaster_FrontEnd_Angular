import { Component, Input } from '@angular/core';
import { ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-generic-radial-counter-chart',
  imports: [NgApexchartsModule],
  templateUrl: './generic-radial-counter-chart.component.html',
  styleUrl: './generic-radial-counter-chart.component.scss'
})
export class GenericRadialCounterChartComponent {
  @Input() label: string = '';
  @Input() count: number = 0;
  @Input() color: string = '#3b82f6';

  series: ApexNonAxisChartSeries = [0];
  chart: ApexChart = { type: 'radialBar', height: 300 };
  labels: string[] = [''];
  plotOptions: ApexPlotOptions = {};
  fill: ApexFill = { colors: ['#3b82f6'] };
  stroke: ApexStroke = { lineCap: 'round' };

  ngOnChanges(): void {
    this.series = [this.count];
    this.labels = [this.label];
    this.fill = { colors: [this.color] };

    this.chart = {
      type: 'radialBar',
      height: 300,
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 500 }
      }
    };

    this.plotOptions = {
      radialBar: {
        hollow: { size: '70%' },
        dataLabels: {
          name: { fontSize: '16px' },
          value: {
            fontSize: '24px',
            formatter: () => `${this.count}`
          }
        }
      }
    };
  }
}
