using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Chartinator.Shell.Core.Request;
using Chartinator.Shell.Core.Response;
using Chartinator.Shell.Helper;

namespace Chartinator.Shell.Services
{
    public class ChartsService
    {
        private readonly DataHelper _dataHelper;

        public ChartsService(DataHelper dataHelper)
        {
            _dataHelper = dataHelper;
        }

        public async Task<List<ExcelListInfo>> ReadExcelFilesNames()
        {
            var data = await _dataHelper.ReadExcelFileNames();

            var result = new List<ExcelListInfo>();

            foreach (var file in data)
            {
                result.Add(new ExcelListInfo
                {
                    FileName = file
                });
            }

            return result;
        }

        public async Task<ChartDataInfo> ReadFiles(List<ExcelFileData> files)
        {
            var result = new ChartDataInfo();

            var labels = new HashSet<float>();

            foreach (var file in files)
            {
                var fileContents = await _dataHelper.ReadData(file);

                fileContents = fileContents.ToList();

                var xValues = fileContents.Select(x => x.X).ToList();

                foreach (var xValue in xValues)
                {
                    labels.Add(xValue);
                }
                
                var dataSet = new ChartDataSet
                {
                    Label = file.FileName,
                    BackgroundColor = GetRandomColor(),
                    BorderColor = GetRandomColor()
                };

                foreach (var dataPoints in fileContents)
                {
                    dataSet.Data.Add(dataPoints.Y);
                }

                result.DataSets.Add(dataSet);
            }

            foreach (var label in labels)
            {
                result.Labels.Add(label);
            }


            result.Title += $"Based on {result.Labels.Count + result.DataSets.SelectMany(x => x.Data).Count()} scanned data points";

            result.XMin = result.DataSets.SelectMany(x => x.Data).Min();
            result.XMax = result.DataSets.SelectMany(x => x.Data).Max();
            result.YMin = labels.Min();
            result.YMax = labels.Max();

            return result;
        }

        private static string GetRandomColor()
        {
            var random = new Random();

            var randomR = random.Next(0, 155);
            var randomG = random.Next(0, 155);
            var randomB = random.Next(0, 155);

            var result = $"rgb({randomR},{randomG},{randomB})";

            return result;
        }
    }
}
