namespace ErlabWebAPI.DataAccessLayer.Models
{
    public class Category
    {
        public Category()
        {
            MainCategories = new List<MainCategory>();
        }
        public List<MainCategory> MainCategories { get; set; }
    }
}
