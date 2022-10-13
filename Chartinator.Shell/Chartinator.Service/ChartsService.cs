﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Service.Helper;
using Chartinator.Transfer.Response;
using Chartinator.Transfer.Response.DataStructure;
using Microsoft.Extensions.Caching.Memory;

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

        var rawData = await _dataHelper.ReadRawData(filePath);

        var dataPoints = await _dataHelper.ParseExcelData(rawData);

        result.DataPoints = dataPoints;
        result.Type = "line";

        return result;
    }

    private async Task<ChartData> ReadTextFileDataPoints(string filePath)
    {
        var rawData = await _dataHelper.ReadRawData(filePath);

        var dataLines = rawData.Split("\n").ToList();

        dataLines = dataLines.Skip(49).ToList();
        dataLines.RemoveAt(dataLines.Count -1);

        var xDataPoint = 0;

        var molarMassDataPoints = new List<ChartDataPoint>();
        foreach (var dataLine in dataLines)
        {
            var dataLineValues = dataLine.Split("\t");
            try
            {
                var molarMassValue = dataLineValues[2].TrimStart().TrimEnd();

                var yDataPoint = long.Parse(molarMassValue, NumberStyles.Any);
                xDataPoint++;

                molarMassDataPoints.Add(new ChartDataPoint
                {
                    X = xDataPoint,
                    Y = yDataPoint
                });
            }
            catch
            {
            }
        }


        var result = new ChartData
        {
            Type = "line",
            DataPoints = molarMassDataPoints
        };

        return result;
    }
}