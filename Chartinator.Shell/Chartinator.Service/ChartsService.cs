using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Service.Helper;
using Chartinator.Transfer.Request;
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


    public async Task<ChartDataInfo> ReadData(List<SelectedFileData> files)
    {
        var result = new ChartDataInfo();

        foreach (var file in files)
        {
            var fileInfo = new FileInfo(file.FilePath);

            result.Title += $"{fileInfo.Name} ";
            switch (fileInfo.Extension)
            {
                case ".xls":
                    var excelChartData = await ReadExcelFileDataPoints(file);
                    result.Data.Add(excelChartData);
                    break;
                case ".txt":
                    var textFileChartData = await ReadTextFileDataPoints(file);
                    result.Data.AddRange(textFileChartData);
                    break;
            }
        }


        result.Title += $"Based on {result.Data.SelectMany(x => x.DataPoints).Count()} scanned data points";

        return result;
    }



    private async Task<ChartData> ReadExcelFileDataPoints(SelectedFileData file)
    {
        var result = new ChartData();

        var rawData = await _dataHelper.ReadRawData(file.FilePath);

        var dataPoints = await _dataHelper.ParseExcelData(rawData, file.Options);

        result.DataPoints = dataPoints;
        result.Type = "line";

        return result;
    }

    private async Task<List<ChartData>> ReadTextFileDataPoints(SelectedFileData file)
    {
        var result = new List<ChartData>();

        var rawData = await _dataHelper.ReadRawData(file.FilePath);

        var dataLines = rawData.Split("\n").ToList();

        dataLines = dataLines.Skip(49).ToList();
        dataLines.RemoveAt(dataLines.Count -1);

        var dataPoints = new List<ChartDataPoint>();

        var molarMassDataPoints = _dataHelper.ParseTextFileData(dataLines, 2);

        var selectedCheckboxes = file.Options.Select(x => x.Label).ToList();

        foreach (var label in selectedCheckboxes)
        {
            List<ulong> data;
            if (label.Equals("rid1A/MMD"))
            {
                var tempResult = new ChartData
                {
                    Type = "line"
                };

                data = _dataHelper.ParseTextFileData(dataLines, 5);

                var tempChartDataPoints = new List<ChartDataPoint>();

                foreach (var molarMassDataPoint in molarMassDataPoints.Select((value, index) => new { i = index, value }))
                {
                    var correspondingRidPoint = data[molarMassDataPoint.i];

                    tempChartDataPoints.Add(new ChartDataPoint
                    {
                        X = molarMassDataPoint.value,
                        Y = correspondingRidPoint
                    });
                }

                tempResult.DataPoints = tempChartDataPoints;

                result.Add(tempResult);
            }

            if (label.Equals("vwd1A/MMD"))
            {
                var tempResult = new ChartData
                {
                    Type = "line"
                };

                data = _dataHelper.ParseTextFileData(dataLines, 8);

                var tempChartDataPoints = new List<ChartDataPoint>();

                foreach (var molarMassDataPoint in molarMassDataPoints.Select((value, index) => new { i = index, value }))
                {
                    var correspondingRidPoint = data[molarMassDataPoint.i];

                    tempChartDataPoints.Add(new ChartDataPoint
                    {
                        X = molarMassDataPoint.value,
                        Y = correspondingRidPoint
                    });
                }

                tempResult.DataPoints = tempChartDataPoints;

                result.Add(tempResult);
            }


        }

        return result;
    }
}