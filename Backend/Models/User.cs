using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagementSystem.Models
{
    // ✅ Base class for timestamps
    public abstract class BaseEntity
    {
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    // ✅ User model
    public class User : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "Student"; // Admin, Professor, Student

        public bool IsActive { get; set; } = true;

        // Navigation
        public Student? Student { get; set; }
        public Professor? Professor { get; set; }
        public Admin? Admin { get; set; }
    }

    // ✅ Admin model
    public class Admin : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required, MaxLength(50)]
        public string EmployeeId { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "Admin";

        public User? User { get; set; }
    }

    // ✅ Student model
    public class Student : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required, MaxLength(50)]
        public string RegistrationNumber { get; set; } = string.Empty;

        [ForeignKey(nameof(ClassGroup))]
        public int? ClassGroupId { get; set; }

        [Required]
        public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public ClassGroup? ClassGroup { get; set; }
        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
        public ICollection<Mark> Marks { get; set; } = new List<Mark>();
    }

    // ✅ Professor model
    public class Professor : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required, MaxLength(50)]
        public string EmployeeId { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Department { get; set; } = string.Empty;

        [Required]
        public DateTime JoiningDate { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public ICollection<Course> Courses { get; set; } = new List<Course>();
        public ICollection<ClassGroup> ClassGroups { get; set; } = new List<ClassGroup>();
        public ICollection<ProfessorSubject> ProfessorSubjects { get; set; } = new List<ProfessorSubject>();
    }

    // ✅ Course model
    public class Course : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(20)]
        public string Code { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Range(1, 10)]
        public int Credits { get; set; }

        [Required, ForeignKey(nameof(Professor))]
        public int ProfessorId { get; set; }

        public Professor? Professor { get; set; }
        public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
        public ICollection<ClassGroup> ClassGroups { get; set; } = new List<ClassGroup>();
    }

    // ✅ Subject model
    public class Subject : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(Course))]
        public int CourseId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
        public string? SyllabusUrl { get; set; }

        public Course? Course { get; set; }
        public ICollection<Mark> Marks { get; set; } = new List<Mark>();
        public ICollection<ProfessorSubject> ProfessorSubjects { get; set; } = new List<ProfessorSubject>();
    }

    // ✅ ClassGroup model
    public class ClassGroup : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [ForeignKey(nameof(Professor))]
        public int? ProfessorId { get; set; }

        [Required, ForeignKey(nameof(Course))]
        public int CourseId { get; set; }

        [Required]
        public string Schedule { get; set; } = string.Empty;

        public Professor? Professor { get; set; }
        public Course? Course { get; set; }
        public ICollection<Student> Students { get; set; } = new List<Student>();
        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    }

    // ✅ Attendance model
    public class Attendance : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(Student))]
        public int StudentId { get; set; }

        [Required, ForeignKey(nameof(ClassGroup))]
        public int ClassGroupId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public bool IsPresent { get; set; } = true;
        public string? Remarks { get; set; }

        public Student? Student { get; set; }
        public ClassGroup? ClassGroup { get; set; }
    }

    // ✅ Mark model
    public class Mark : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey(nameof(Student))]
        public int StudentId { get; set; }

        [Required, ForeignKey(nameof(Subject))]
        public int SubjectId { get; set; }

        [Range(0, 100)]
        public decimal Score { get; set; }

        [MaxLength(2)]
        public string? Grade { get; set; }

        public Student? Student { get; set; }
        public Subject? Subject { get; set; }
    }

    // ✅ ProfessorSubject mapping model (for many-to-many)
    public class ProfessorSubject
    {
        public int ProfessorId { get; set; }
        public int SubjectId { get; set; }

        // Navigation
        public Professor? Professor { get; set; }
        public Subject? Subject { get; set; }
    }
}
