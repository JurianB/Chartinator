using System.Collections.Generic;

namespace Chartinator.Shell.Core.Response
{
    public class ChartDataInfo
    {
        public ChartDataInfo()
        {
            Data = new List<ChartData>();
        }
        public string Title { get; set; }
        public List<ChartData> Data { get; set; }
    }
}
