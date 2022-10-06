import { IChartDataPoint } from "./IChartDataPoint";

export interface IChartData {
    type: string;
    axisYType: string;
    name: string;
    showInLegend: boolean;
    markerSize: number;
    yValueFormatString: string;
    dataPoints: IChartDataPoint[];
}