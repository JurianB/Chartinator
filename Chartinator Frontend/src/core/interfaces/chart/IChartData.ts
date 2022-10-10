import { IChartDataPoint } from "./IChartDataPoint";

export interface IChartData {
    type: string;
    dataPoints: IChartDataPoint[];
}