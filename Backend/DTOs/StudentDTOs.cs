using System;
using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.DTOs
{
    // ✅ DTO returned in GET responses
    public class StudentDTO
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string RegistrationNumber { get; set; } = string.Empty;
        public int? ClassGroupId { get; set; }
        public string? ClassName { get; set; }
        public DateTime EnrollmentDate { get; set; }
    }

    // ✅ Used in POST (create new student)
    public class CreateStudentRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, StringLength(20)]
        public string RegistrationNumber { get; set; } = string.Empty;

        public int? ClassGroupId { get; set; }

        // Optional: default password for student accounts
        [StringLength(100)]
        public string Password { get; set; } = "Student@123";
    }

    // ✅ Used in PUT/PATCH (update student info)
    public class UpdateStudentRequest
    {
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        public int? ClassGroupId { get; set; }
    }
}
