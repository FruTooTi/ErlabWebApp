using DataAccessLayer.Models;
using ErlabWebAPI.DataAccessLayer.Models;
using ErlabWebAPI.DataAccessLayer.Repositories;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class MovieService
    {
        MovieRepository _repository;
        IMemoryCache _cache;
        public MovieService(MovieRepository repository, IMemoryCache cache)
        {
            _repository = repository;
            _cache = cache;
        }
        public async Task<List<Movie>> GetAllMovies()
        {
            try
            {
                return await _repository.Get();
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        public async Task<Movie> GetMovieByObjectId(string id)
        {
            try
            {
                return await _repository.GetById(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<List<Movie>> GetMoviesByCategories(string mainCategory, string subCategory)
        {
            try
            {
                return await _repository.GetMoviesByCategory(mainCategory, subCategory);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<Category> GetAllCategories()
        {
            List<Movie> allMovies = new List<Movie>();
            Category allCategories = _cache.Get<Category>("categories");
            
            // If categories exist in cache, return cache.
            if (allCategories != null)
                return allCategories;
            // If categories don't exist in cache, prepare the category class, add to cache.
            else
            {
                allCategories = new Category();
                allMovies = await _repository.Get();
            }
            foreach (var movie in allMovies)
            {
                for (int i = 0; i < movie.CategoryAddress.Length; i++)
                {
                    bool MaincategoryExists = false;

                    var categoryValues = movie.CategoryAddress[i].Split('/');
                    MainCategory targetCategory = new MainCategory();

                    // Check if main category exists
                    allCategories.MainCategories.ForEach(mainCategory =>
                    {
                        if (mainCategory.Name == categoryValues[1])
                        {
                            MaincategoryExists = true;
                            targetCategory = mainCategory;
                        };
                    });
                    if (MaincategoryExists == false)
                    {
                        MainCategory mainCato = new MainCategory();
                        mainCato.Name = categoryValues[1];

                        SubCategory subCato = new SubCategory();
                        subCato.Name = categoryValues[2];
                        subCato.Contents = await _repository.GetMoviesByCategory(categoryValues[1], categoryValues[2]);

                        mainCato.SubCategories.Add(subCato);
                        if (!allCategories.MainCategories.Contains(mainCato))
                            allCategories.MainCategories.Add(mainCato);
                    }
                    else
                    {
                        MainCategory mainCato = targetCategory;
                        bool SubCategoryExists = false;
                        mainCato.SubCategories.ForEach(subCategory =>
                        {
                            if (subCategory.Name == categoryValues[2])
                            {
                                SubCategoryExists = true;
                            }
                        });
                        if (SubCategoryExists == false)
                        {
                            SubCategory newSubcategory = new SubCategory();
                            newSubcategory.Name = categoryValues[2];
                            newSubcategory.Contents = await _repository.GetMoviesByCategory(categoryValues[1], categoryValues[2]);
                            mainCato.SubCategories.Add(newSubcategory);
                        }
                    }
                }
            }
            _cache.Set("categories", allCategories, TimeSpan.FromMinutes(1));
            return allCategories;
        }
        public async Task<List<string>> GetAllMainCategories()
        {
            List<string> allMainCategories = _cache.Get<List<string>>("MainCategories");
            List<Movie> allMovies;
            if (allMainCategories != null)
                return allMainCategories;
            else
            {
                allMainCategories = new List<string>();
                allMovies = await _repository.Get();
            }
            foreach(var movie in allMovies)
            {
                for(int i = 0; i < movie.CategoryAddress.Length; i++)
                {
                    var categoryArray = movie.CategoryAddress[i].Split('/');
                    if (allMainCategories.Contains(categoryArray[1]))
                        break;
                    else
                        allMainCategories.Add(categoryArray[1]);
                }
            }
            _cache.Set("MainCategories", allMainCategories, TimeSpan.FromSeconds(10));
            return allMainCategories;
        }
        public async Task<List<string>> GetAllSubCategories(string mainCategory)
        {
            List<string> subCategories = _cache.Get<List<string>>(mainCategory);
            List<Movie> allMovies;
            if (subCategories != null)
                return subCategories;
            else
            {
                subCategories = new List<string>();
                allMovies = await _repository.Get();
            }

            foreach(var movie in allMovies)
            {
                for(int i = 0; i < movie.CategoryAddress.Length; i++)
                {
                    var categoryArray = movie.CategoryAddress[i].Split("/");
                    if(categoryArray.Contains(mainCategory))
                    {
                        if (!subCategories.Contains(categoryArray[2]))
                            subCategories.Add(categoryArray[2]);
                    }
                }
            }
            _cache.Set(mainCategory, subCategories, TimeSpan.FromMinutes(1));
            return subCategories;
        }
        public async Task<Movie> InsertaMovie(Movie movie)
        {
            try
            {
                await _repository.InsertMovie(movie);
                return movie;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        public async Task<bool> UpdateaMovie(Movie movie)
        {
            try
            {
                bool result = await _repository.UpdateMovie(movie);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        public async Task<bool> DeleteaMovie(Movie movie)
        {
            try
            {
                bool deleted = await _repository.DeleteMovie(movie);
                return deleted;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
