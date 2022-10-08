using Chartinator.Shell.Core;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System;
using Chartinator.Service;
using Chartinator.Shell.Controllers.Base;

namespace Chartinator.Shell.Controllers
{
    public class DataStructureController  : BaseApiController
    {
        private readonly DataStructureService _dataStructureService;

        public DataStructureController(DataStructureService dataStructureService)
        {
            _dataStructureService = dataStructureService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDataStructure()
        {
            try
            {
                var folderStructure = await _dataStructureService.GetDataStructure();

                return HandleResult(new OperationResult(HttpStatusCode.OK, folderStructure));
            }
            catch (Exception e)
            {
                var errorInfo = new ErrorInfo("Failed to retrieve the excels.", $"{GetType().Name}::GetFolderStructure", e);

                return InternalServerError(errorInfo);
            }
        }
    }
}
