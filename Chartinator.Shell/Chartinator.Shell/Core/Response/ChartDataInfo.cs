using System.Collections.Generic;

namespace Chartinator.Shell.Core.Response
{
    public class ChartDataInfo
    {
        public ChartDataInfo()
        {
            Labels = new List<object>();
            DataSets = new List<ChartDataSet>();
        }
        public string  Title { get; set; }
        public List<object> Labels  { get; set; }
        public List<ChartDataSet> DataSets { get; set; }
    }
}
