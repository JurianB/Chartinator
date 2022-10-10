import { IChartDataPoint } from "./IChartDataPoint";

export interface IChartData {
    type: string;
    axisYType: string;
    name: string;
    yValueFormatString: string;
    dataPoints: IChartDataPoint[];
}