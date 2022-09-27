using DataAccessLayer.Models;
using MongoDB.Driver;
namespace ErlabWebAPI.DataAccessLayer.Repositories
{
    public class MongoClientExpansion
    {
        private MongoClient _client { get; set; }
        private IMongoCollection<Movie> _collection { get; set; }
        public MongoClientExpansion(MongoClient client, string databaseName, string collectionName)
        {
            _client = client;
            _collection = _client.GetDatabase(databaseName).GetCollection<Movie>(collectionName);
        }
        public MongoClient getClient()
        {
            return _client;
        }
        public IMongoCollection<Movie> getCollection()
        {
            return _collection;
        }
    }
}
