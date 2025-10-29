using System;
using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.DTOs
{
    // ✅ Used for returning subject data in responses
    public class SubjectDTO
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? SyllabusUrl { get; set; }
        public string? ProfessorName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    // ✅ Used when creating a new subject
    public class CreateSubjectRequest
    {
        [Required]
        public int CourseId { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Url]
        public string? SyllabusUrl { get; set; }
    }

    // ✅ Used when updating an existing subject
    public class UpdateSubjectRequest
    {
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Url]
        public string? SyllabusUrl { get; set; }
    }
}
