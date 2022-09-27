using DataAccessLayer.Models;

namespace ErlabWebAPI.DataAccessLayer.Models
{
    public class SubCategory
    {
        public string Name { get; set; }
        public List<Movie> Contents { get; set; }
        public SubCategory()
        {
            Contents = new List<Movie>();
        }
    }
}
