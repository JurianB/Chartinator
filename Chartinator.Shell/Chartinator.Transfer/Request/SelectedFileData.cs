using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chartinator.Transfer.Request
{
    public class SelectedFileData
    {
        public SelectedFileData()
        {
            Options = new List<SelectedFileOption>();
        }

        public string FilePath { get; set; }
        public List<SelectedFileOption> Options { get; set; }
    }
}
