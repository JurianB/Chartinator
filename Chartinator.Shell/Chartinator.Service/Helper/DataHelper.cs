using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Chartinator.Shell.Core.Request;
using Chartinator.Shell.Core.Response;
using Microsoft.Extensions.Caching.Memory;

namespace Chartinator.Service.Helper
{
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

        public async Task<List<string>> ReadExcelFileNames()
        {
            var files = Directory.GetFiles(DataFolder);

            var excels = new List<string>();

            foreach (var file in files)
            {
                var fileName = Path.GetFileNameWithoutExtension(file);

                if (!file.Contains(".CSV"))
                    continue;

                excels.Add(fileName);
            }

            return excels;
        }

        public async Task<List<ChartDataPoint>> ReadData(ExcelFileData file)
        {
            _cache.TryGetValue($"{DataPointsCacheKeyPrefix}-{file.FileName}", out List<ChartDataPoint> cacheData);

            if (cacheData != null)
            {
                return cacheData;
            }

            var result = new List<ChartDataPoint>();

            var excelPath = Path.Combine(DataFolder, file.FileName + ".xls");

            string excelData;
            using (var reader = new StreamReader(excelPath))
            {
                excelData = await reader.ReadToEndAsync();
            }

            var excelLines = excelData.Split("\n");

            var dataPointsAsString = excelLines.Skip(500).ToList();
            //var dataPointsAsString = excelLines.Skip(17487).ToList();

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

            _cache.Set($"{DataPointsCacheKeyPrefix}-{file.FileName}", result);

            return result;
        }
    }
}
