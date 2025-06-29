using SocketUtil;
using SocketServices;
using SocketUtil.Stream;
using NetworkSpace;
using SocketUtil.Hardware;

var networkOptions = new Network().GetOptions();
var builder = WebApplication.CreateBuilder(args);
string serverAddress = "http://" + networkOptions.IPV4Address + ":80";

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSingleton<DeviceService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddCors(options => {
    options.AddPolicy(name: "_ReactCors", policy => {
        policy
         .SetIsOriginAllowed((host) => {
            return true;
        })
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddSignalR(options =>
{
    const int ONE_MB = 1024 * 1024;
    options.EnableDetailedErrors = true;
    options.MaximumReceiveMessageSize = 5 * ONE_MB;
});

builder.WebHost.UseUrls(serverAddress);

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("_ReactCors");
app.UseRouting();
app.MapControllers();
app.MapHub<SocketHub>("/socket");
app.MapHub<ProcessHub>("/process");
app.MapHub<MouseHub>("/mouse");
app.MapHub<StreamHub>("/screenBrodcast");
app.MapHub<HardwarePerformanceHub>("/hardware/performance");
app.UseHttpsRedirection();
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
