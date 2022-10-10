﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Service.Helper;
using Chartinator.Transfer.Response;
using Chartinator.Transfer.Response.DataStructure;

namespace Chartinator.Service;

public class ChartsService
{
    private readonly DataHelper _dataHelper;

    public ChartsService(DataHelper dataHelper)
    {
        _dataHelper = dataHelper;
    }


    public async Task<ChartDataInfo> ReadData(List<string> filePaths)
    {
        var result = new ChartDataInfo();
        
        //C:\Users\Jurian\Desktop\Data\GCMS\HY007.CSV.xls
        foreach (var filePath in filePaths)
        {
            var fileInfo = new FileInfo(filePath);

            result.Title += $"{fileInfo.Name} ";
            switch (fileInfo.Extension)
            {
                case ".xls":
                    var excelChartData = await ReadExcelFileDataPoints(filePath);
                    result.Data.Add(excelChartData);
                    break;
                case ".txt":
                    var textFileChartData = await ReadTextFileDataPoints(filePath);
                    result.Data.Add(textFileChartData);
                    break;
            }
        }


        result.Title += $"Based on {result.Data.SelectMany(x => x.DataPoints).Count()} scanned data points";

        return result;
    }



    private async Task<ChartData> ReadExcelFileDataPoints(string filePath)
    {
        var result = new ChartData();

        var dataPoints = await _dataHelper.ReadData(filePath);

        result.DataPoints = dataPoints;
        result.Type = "line";

        return result;
    }

    private async Task<ChartData> ReadTextFileDataPoints(string filePath)
    {
        throw new NotImplementedException();
    }
}