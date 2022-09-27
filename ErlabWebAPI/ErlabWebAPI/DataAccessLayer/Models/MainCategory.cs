namespace ErlabWebAPI.DataAccessLayer.Models
{
    public class MainCategory
    {
        public string Name { get; set; }
        public List<SubCategory> SubCategories { get; set; }
        public MainCategory()
        {
            SubCategories = new List<SubCategory>();
        }
    }
}
