 

## 1. Prerequisites

* **.NET SDK** (6.0 or later) installed
* **Node.js** (16.x or later) + npm/yarn
* Code editor (e.g. VS Code)
* Basic C# and JavaScript/React familiarity

---

## 2. Backend: ASP .NET Core Web API

### 2.1. Create the Project

```bash
# In your terminal:
mkdir MyFullstackApp
cd MyFullstackApp

# Create an ASP.NET Core Web API
dotnet new webapi -n Api
cd Api
```

> **Why?**
>
> * `webapi` template gives you a ready-to-go REST API scaffold.
> * We’ll add Entity Framework Core for database access.

### 2.2. Add EF Core and Configure Database

```bash
# From the Api folder
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

In `appsettings.json`, configure your connection string:

```jsonc
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MyAppDb;Trusted_Connection=True;"
  },
  // ...
}
```

### 2.3. Define Your Model + DbContext

Create a `Models/` folder, and inside:

```csharp
// Models/Product.cs
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

```csharp
// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using MyFullstackApp.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> opts)
        : base(opts) { }

    public DbSet<Product> Products { get; set; }
}
```

### 2.4. Register DbContext in Startup

In `Program.cs` (for .NET 6+ minimal API style), add:

```csharp
using Microsoft.EntityFrameworkCore;
using MyFullstackApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Register EF Core
builder.Services.AddDbContext<AppDbContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseCors();
app.MapControllers();
app.Run();
```

> **Why CORS?**
> The React front end (running on another port) needs permission to call your API.

### 2.5. Create a Controller

```csharp
// Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFullstackApp.Data;
using MyFullstackApp.Models;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IEnumerable<Product>> Get() =>
        await _db.Products.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p == null) return NotFound();
        return p;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Post(Product p)
    {
        _db.Products.Add(p);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = p.Id }, p);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Product p)
    {
        if (id != p.Id) return BadRequest();
        _db.Entry(p).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p == null) return NotFound();
        _db.Products.Remove(p);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
```

### 2.6. Migrations & Database Creation

```bash
# In Api folder
dotnet ef migrations add InitialCreate
dotnet ef database update
```

* `InitialCreate` scaffolds your table.
* `database update` actually creates it in SQL Server LocalDB.

---

## 3. Front End: React App

### 3.1. Bootstrap with Create-React-App

In your solution root:

```bash
cd ..
npx create-react-app client
cd client
```

> You now have `client/` for React, and `Api/` for backend.

### 3.2. Install Axios (or use fetch)

```bash
npm install axios
```

### 3.3. Set Up Proxy (Optional)

In `client/package.json`, add:

```jsonc
  "proxy": "http://localhost:5000",
```

> This lets you request `/api/products` instead of full URLs.

### 3.4. Fetch & Display Products

Edit `src/App.js`:

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    }
    load();
  }, []);

  return (
    <div className="App">
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — ${p.price}
```
