using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Transfer.Request;
using Chartinator.Transfer.Response;
using Chartinator.Transfer.Response.DataStructure;
using Microsoft.Extensions.Caching.Memory;

namespace Chartinator.Service.Helper;

public class DataHelper
{
    private static readonly string Desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
    private static readonly string DataFolder = Path.Combine(Desktop, "Data");
    private static readonly string DataPointsCacheKeyPrefix = "DataPointsCacheKeyPrefix";


    public async Task<string> ReadRawData(string filePath)
    {
        var data = string.Empty;

        using (var reader = new StreamReader(filePath))
        {
            data = await reader.ReadToEndAsync();
        }

        return data;
    }

    public async Task<List<ChartDataPoint>> ParseExcelData(string rawData, IEnumerable<SelectedFileOption> fileOptions)
    {
        var result = new List<ChartDataPoint>();

        var excelLines = rawData.Split("\n");
        
        var selectedSections = fileOptions.Select(x => x.Label).ToList();

        List<string> dataPointsAsString;
        if (selectedSections.Contains("Section 1") && selectedSections.Count == 1)
        {
            dataPointsAsString = excelLines.Skip(0).Take(17488).ToList();
        }
        else if (selectedSections.Contains("Section 2") && selectedSections.Count == 1)
        {
            dataPointsAsString = excelLines.Skip(17488).ToList();
        }
        else
        {
            dataPointsAsString = excelLines.ToList();
        }

        foreach (var dataPointAsString in dataPointsAsString)
        {
            var tempData = dataPointAsString.Replace("\r", "");

            var tempResult = new ChartDataPoint();

            var lineSplitted = tempData.Split(",").ToList();

            try
            {
                tempResult.X = float.Parse(lineSplitted[0], CultureInfo.InvariantCulture);
                tempResult.Y = float.Parse(lineSplitted[1], CultureInfo.InvariantCulture);
            }
            catch
            {

            }

            result.Add(tempResult);
        }

        return result;
    }

    public List<ulong> ParseTextFileData(IEnumerable<string> dataLines, int index)
    {
        var result = new List<ulong>();

        foreach (var dataLine in dataLines)
        {
            var dataLineValues = dataLine.Split("\t");
            try
            {
                var molarMassValue = dataLineValues[index].TrimStart().TrimEnd();

                try
                {
                    var dataPoint = ulong.Parse(molarMassValue, NumberStyles.Any);

                    result.Add(dataPoint);
                }
                catch
                {
                }
            }
            catch
            {
                // ignored
            }
        }

        return result;
    }
}