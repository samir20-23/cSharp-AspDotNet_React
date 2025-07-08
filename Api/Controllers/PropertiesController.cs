using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new[] {
          new { id=1, title="Sunny Riad" },
          new { id=2, title="Ocean View Villa" }
        });
    }
}
