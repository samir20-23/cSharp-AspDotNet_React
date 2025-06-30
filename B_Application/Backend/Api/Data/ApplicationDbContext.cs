using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) {}

        public DbSet<Property> Properties { get; set; }
    }

    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
    }
}
