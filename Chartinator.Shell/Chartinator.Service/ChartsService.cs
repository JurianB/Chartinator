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


    public async Task<ChartDataInfo> ReadData(DataStructureInfo dataStructureInfo)
    {
        var result = new ChartDataInfo
        {
            Title = "Scanned files: "
        };

        var files = dataStructureInfo.Folders.SelectMany(x => x.Files).Where(x => x.Selected).ToList();

        var filesScanned = new List<string>();
        foreach (var file in files)
        {
            var fileInfo = new FileInfo(file.Path);

            filesScanned.Add($"{fileInfo.Name}");
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

        result.Title += string.Join(", ", filesScanned);
        result.SubTitle += $"Based on {result.Data.SelectMany(x => x.DataPoints).Count()} scanned data points";

        return result;
    }



    private async Task<ChartData> ReadExcelFileDataPoints(DataFile file)
    {
        var result = new ChartData();

        var rawData = await _dataHelper.ReadRawData(file.Path);

        var dataPoints = await _dataHelper.ParseExcelData(rawData, file.Options);

        result.DataPoints = dataPoints;
        result.Type = "line";

        return result;
    }

    private async Task<List<ChartData>> ReadTextFileDataPoints(DataFile file)
    {
        var result = new List<ChartData>();

        var rawData = await _dataHelper.ReadRawData(file.Path);

        var dataLines = rawData.Split("\n").ToList();

        dataLines = dataLines.Skip(49).ToList();
        dataLines.RemoveAt(dataLines.Count -1);

        var molarMassDataPoints = _dataHelper.ParseTextFileColumnData(dataLines, 2);

        var selectedCheckboxes = file.Options.Where(x => x.Checked).ToList();

        foreach (var checkbox in selectedCheckboxes)
        {
            List<float> data;
            if (checkbox.Label.Equals("rid1A/MMD"))
            {
                var tempResult = new ChartData
                {
                    Type = "line"
                };

                data = _dataHelper.ParseTextFileColumnData(dataLines, 6);

                var tempChartDataPoints = new List<ChartDataPoint>();

                foreach (var molarMassDataPoint in molarMassDataPoints.Select((value, index) => new { i = index, value }))
                {
                    var correspondingPoint= data[molarMassDataPoint.i];

                    tempChartDataPoints.Add(new ChartDataPoint
                    {
                        X = molarMassDataPoint.value,
                        Y = correspondingPoint
                    });
                }

                tempResult.DataPoints = tempChartDataPoints;

                tempResult.Legend = checkbox.Label;

                result.Add(tempResult);
            }

            if (checkbox.Label.Equals("vwd1A/MMD"))
            {
                var tempResult = new ChartData
                {
                    Type = "line"
                };

                data = _dataHelper.ParseTextFileColumnData(dataLines, 9);

                var tempChartDataPoints = new List<ChartDataPoint>();

                foreach (var molarMassDataPoint in molarMassDataPoints.Select((value, index) => new { i = index, value }))
                {
                    var correspondingPoint = data[molarMassDataPoint.i];

                    tempChartDataPoints.Add(new ChartDataPoint
                    {
                        X = molarMassDataPoint.value,
                        Y = correspondingPoint
                    });
                }

                tempResult.DataPoints = tempChartDataPoints;
                tempResult.Legend = checkbox.Label;

                result.Add(tempResult);
            }


        }

        return result;
    }
}