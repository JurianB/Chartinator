using System.Collections.Generic;

namespace Chartinator.Transfer.Response
{
    public class ChartDataInfo
    {
        public ChartDataInfo()
        {
            Data = new List<ChartData>();
        }
        public string Title { get; set; }
        public List<ChartData> Data { get; set; }
        public string SubTitle { get; set; }
    }
}
