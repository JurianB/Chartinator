import { IChartDataPoint } from "./IChartDataPoint";

export interface IChartData {
    type: string;
    legend: string;
    dataPoints: IChartDataPoint[];
}