using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // =============================
        //  DB SETS (Tables)
        // =============================
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<ClassGroup> ClassGroups { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<ProfessorSubject> ProfessorSubjects { get; set; }

        // =============================
        //  MODEL CONFIGURATION
        // =============================
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // -----------------------------
            // User
            // -----------------------------
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasMaxLength(50)
                .IsRequired();

            // -----------------------------
            // ✅ Admin – User (One-to-One)
            // -----------------------------
            modelBuilder.Entity<Admin>()
                .HasOne(a => a.User)
                .WithOne(u => u.Admin)
                .HasForeignKey<Admin>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // ✅ Professor – User (One-to-One)
            // -----------------------------
            modelBuilder.Entity<Professor>()
                .HasOne(p => p.User)
                .WithOne(u => u.Professor)
                .HasForeignKey<Professor>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // ✅ Student – User (One-to-One)
            // -----------------------------
            modelBuilder.Entity<Student>()
                .HasOne(s => s.User)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // Student – ClassGroup (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Student>()
                .HasOne(s => s.ClassGroup)
                .WithMany(cg => cg.Students)
                .HasForeignKey(s => s.ClassGroupId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // Course & Professor (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Professor)
                .WithMany(p => p.Courses)
                .HasForeignKey(c => c.ProfessorId)
                .OnDelete(DeleteBehavior.Restrict);

            // -----------------------------
            // Subject – Course (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Subject>()
                .HasOne(s => s.Course)
                .WithMany(c => c.Subjects)
                .HasForeignKey(s => s.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // ClassGroup – Professor (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<ClassGroup>()
                .HasOne(cg => cg.Professor)
                .WithMany(p => p.ClassGroups)
                .HasForeignKey(cg => cg.ProfessorId)
                .OnDelete(DeleteBehavior.SetNull);

            // -----------------------------
            // ClassGroup – Course (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<ClassGroup>()
                .HasOne(cg => cg.Course)
                .WithMany(c => c.ClassGroups)
                .HasForeignKey(cg => cg.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // Attendance – Student (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Student)
                .WithMany(s => s.Attendances)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // Attendance – ClassGroup (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.ClassGroup)
                .WithMany(cg => cg.Attendances)
                .HasForeignKey(a => a.ClassGroupId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // Marks – Student (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Student)
                .WithMany(s => s.Marks)
                .HasForeignKey(m => m.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // Marks – Subject (Many-to-One)
            // -----------------------------
            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Subject)
                .WithMany(s => s.Marks)
                .HasForeignKey(m => m.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // -----------------------------
            // ✅ ProfessorSubject (Many-to-Many)
            // -----------------------------
            modelBuilder.Entity<ProfessorSubject>()
                .HasKey(ps => new { ps.ProfessorId, ps.SubjectId });

            modelBuilder.Entity<ProfessorSubject>()
                .HasOne(ps => ps.Professor)
                .WithMany(p => p.ProfessorSubjects)
                .HasForeignKey(ps => ps.ProfessorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProfessorSubject>()
                .HasOne(ps => ps.Subject)
                .WithMany(s => s.ProfessorSubjects)
                .HasForeignKey(ps => ps.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
