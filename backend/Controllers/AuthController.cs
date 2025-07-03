using CampaignManager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using CampaignManager.Models;

public class AuthController : BaseController
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> _userManager;

    public AuthController(IAuthService authService, IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService.RegisterAsync(request);
        if (response == null)
        {
            return BadRequest("Registration failed.");
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var token = _authService.GenerateJwtToken(user);
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var expirationHours = jwtSettings.GetValue<int>("ExpirationHours");

        Response.Cookies.Append("jwt_token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddHours(expirationHours)
        });

        return Ok(new
        {
            userId = response.UserId,
            email = response.Email,
            firstName = response.FirstName,
            lastName = response.LastName,
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService.LoginAsync(request);
        if (response == null)
        {
            return Unauthorized("Invalid login attempt.");
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var token = _authService.GenerateJwtToken(user);
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var expirationHours = jwtSettings.GetValue<int>("ExpirationHours");

        Response.Cookies.Append("jwt_token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddHours(expirationHours)
        });

        return Ok(new
        {
            userId = response.UserId,
            email = response.Email,
            firstName = response.FirstName,
            lastName = response.LastName,
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt_token", new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax
        });

        return Ok(new { message = "Logged out successfully." });
    }
}