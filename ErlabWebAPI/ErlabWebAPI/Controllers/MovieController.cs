using BusinessAccessLayer.Services;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ErlabWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        MovieService _service;
        public MovieController(MovieService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            return Ok(await _service.GetAllMovies());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(string id)
        {
            return Ok(await _service.GetMovieByObjectId(id));
        }
        [HttpGet("{mainCategory}/{subCategory}")]
        public async Task<IActionResult> GetAllMoviesByCategory(string mainCategory, string subCategory)
        {
            return Ok(await _service.GetMoviesByCategories(mainCategory, subCategory));
        }
        [HttpGet("getAllCategories")]
        public async Task<IActionResult> GetAllCategoriesOfContents()
        {
            return Ok(await _service.GetAllCategories());
        }
        [HttpGet("getAllMainCategories")]
        public async Task<IActionResult> GetAllMainCategoriesOfContents()
        {
            return Ok(await _service.GetAllMainCategories());
        }
        [HttpGet("getAllSubCategories/{mainCategory}")]
        public async Task<IActionResult> GetAllSubCategoriesOfContents(string mainCategory)
        {
            return Ok(await _service.GetAllSubCategories(mainCategory));
        }
        [HttpPost("InsertMovies")]
        public async Task<IActionResult> InsertaNewMovie(Movie movie)
        {
            return Ok(await _service.InsertaMovie(movie));
        }
        [HttpPut("UpdateMovies")]
        public async Task<IActionResult> UpdateanExistingMovie(Movie movie)
        {
            return Ok(await _service.UpdateaMovie(movie));
        }
        [HttpDelete("DeleteMovies")]
        public async Task<IActionResult> DeleteanExistingMovie(Movie movie)
        {
            return Ok(await _service.DeleteaMovie(movie));
        }
    }
}