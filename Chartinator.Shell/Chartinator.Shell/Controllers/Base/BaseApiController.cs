using Microsoft.AspNetCore.Mvc;
using System.Net;
using Chartinator.Shell.Core;

namespace Chartinator.Shell.Controllers.Base
{

    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController : Controller
    {
        protected IActionResult InternalServerError(ErrorInfo error)
        {
            var status = new OperationResult(HttpStatusCode.InternalServerError, error);

            return StatusCode((int)HttpStatusCode.InternalServerError, status);
        }

        protected IActionResult HandleResult(OperationResult operationResult)
        {
            return StatusCode((int)HttpStatusCode.OK, operationResult);
        }
    }
}
