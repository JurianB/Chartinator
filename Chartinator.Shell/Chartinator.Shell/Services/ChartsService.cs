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
            
            foreach (var file in files)
            {
                var fileContents = await _dataHelper.ReadData(file);

                fileContents = fileContents.ToList();

                var tempResult = new ChartData();

                tempResult.Name = file.FileName;

                foreach (var chartDataPoint in fileContents)
                {
                    tempResult.DataPoints.Add(new ChartDataPoint
                    {
                        X = chartDataPoint.X,
                        Y = chartDataPoint.Y
                    });
                }

                tempResult.Type = "line";
                tempResult.AxisYType = "secondary";
                tempResult.MarkerSize = 0;
                tempResult.ShowInLegend = true;
                
                tempResult.YValueFormatString = "";

                result.Data.Add(tempResult);
            }
            

            result.Title += $"Based on {result.Data.SelectMany(x => x.DataPoints).Count()} scanned data points";

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
