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
    private readonly IMemoryCache _cache;

    public DataHelper(IMemoryCache cache)
    {
        _cache = cache;
    }

    public async Task<List<ChartDataPoint>> ReadExcelData(string filePath)
    {
        _cache.TryGetValue(filePath, out List<ChartDataPoint> cacheData);

        if (cacheData != null)
        {
            return cacheData;
        }

        var result = new List<ChartDataPoint>();
        
        using (var reader = new StreamReader(filePath))
        {
            filePath = await reader.ReadToEndAsync();
        }

        var excelLines = filePath.Split("\n");

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

        _cache.Set(filePath, result);

        return result;
    }
}