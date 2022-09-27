using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ErlabWebAPI.DataAccessLayer.Models;

namespace DataAccessLayer.Models
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Title")]
        public string Title { get; set; }
        [BsonElement("Description")]
        public string Description { get; set; }
        [BsonElement("Director")]
        public string Director { get; set; }
        [BsonElement("Category")]
        public string[] CategoryAddress { get; set; }
        [BsonElement("IMDb Rating")]
        public double IMDbRating { get; set; }
        [BsonElement("Writer")]
        public string Writer { get; set; }
        [BsonElement("Stars")]
        public string Stars { get; set; }
        [BsonElement("Poster")]
        public string Poster { get; set; }
        [BsonElement("Genre")]
        public string Genre { get; set; }
        [BsonElement("PlaybackURL")]
        public string Playback { get; set; }
    }
}
