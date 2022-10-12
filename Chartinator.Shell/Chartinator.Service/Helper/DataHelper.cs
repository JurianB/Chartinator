using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Transfer.Response;
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

    public async Task<List<ChartDataPoint>> ParseExcelData(string rawData)
    {
        var result = new List<ChartDataPoint>();
        
       var excelLines = rawData.Split("\n");

        var dataPointsAsString = excelLines.Skip(17488).ToList();

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
            catch (Exception e)
            {
                    
            }

            result.Add(tempResult);
        }
        
        return result;
    }
}