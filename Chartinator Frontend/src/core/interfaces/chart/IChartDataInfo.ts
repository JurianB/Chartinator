import { IChartDataSet } from "./IChartDataSet";

export interface IChartDataInfo {
    title: string;
    labels: string[];
    dataSets: IChartDataSet[];
    XMin:number;
    XMax:number;
    YMin:number;
    YMax:number;

}