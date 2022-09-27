using BusinessAccessLayer.Services;
using ErlabWebAPI.DataAccessLayer.Repositories;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// MongoClient and Repositories
builder.Services.AddSingleton<MongoClientExpansion>(new MongoClientExpansion(
    new MongoClient(builder.Configuration.GetConnectionString("mongoDatabase")),
    builder.Configuration.GetSection("MongoDbProperties")["databaseName"],
    builder.Configuration.GetSection("MongoDbProperties")["collectionName"]));
builder.Services.AddSingleton<MovieRepository>();
builder.Services.AddSingleton<MovieService>();
builder.Services.AddMemoryCache();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(policy => policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
