using DataAccessLayer.Models;
using ErlabWebAPI.DataAccessLayer.Models;
using MongoDB.Driver;

namespace ErlabWebAPI.DataAccessLayer.Repositories
{
    public class MovieRepository
    {
        MongoClientExpansion _expansion;
        public MovieRepository(MongoClientExpansion expansion)
        {
            _expansion = expansion;
        }
        public async Task<List<Movie>> Get()
        {
            List<Movie> allMovies = await _expansion.getCollection().Find(Builders<Movie>.Filter.Empty).ToListAsync();
            return allMovies;
        }
        public async Task<Movie> GetById(string ObjectId)
        {
            var filter = Builders<Movie>.Filter.Eq(m => m.Id, ObjectId);
            Movie movie = await _expansion.getCollection().Find(filter).FirstOrDefaultAsync();
            return movie;
        }
        public async Task<List<Movie>> GetMoviesByCategory(string mainCategory, string subCategory)
        {
            string categoryPath = "/" + mainCategory + "/" + subCategory;
            var filter = Builders<Movie>.Filter.AnyEq(m => m.CategoryAddress, categoryPath);
            List<Movie> targetMovies = await _expansion.getCollection().Find(filter).ToListAsync();
            return targetMovies;
        }
        public async Task<Movie> InsertMovie(Movie movie)
        {
            await _expansion.getCollection().InsertOneAsync(movie);
            return movie;
        }
        public async Task<bool> UpdateMovie(Movie movie)
        {
            var filter = Builders<Movie>.Filter.Eq(m => m.Id, movie.Id);
            var result = await _expansion.getCollection().ReplaceOneAsync(filter, movie);
            if (result.IsAcknowledged == false)
                return false;
            return true;
        }
        public async Task<bool> DeleteMovie(Movie movie)
        {
            var filter = Builders<Movie>.Filter.Eq(m => m.Id, movie.Id);
            var result = await _expansion.getCollection().DeleteOneAsync(filter);
            if (result.IsAcknowledged == false)
                return false;
            return true;
        }
    }
}
