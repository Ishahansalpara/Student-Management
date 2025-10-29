using System;
using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.DTOs
{
    // ✅ Data Transfer Object for displaying marks and grades
    public class MarkDTO
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public int SubjectId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public decimal Score { get; set; }
        public string? Grade { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    // ✅ Request for creating new marks
    public class CreateMarkRequest
    {
        [Required]
        public int StudentId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Range(0, 100, ErrorMessage = "Score must be between 0 and 100")]
        public decimal Score { get; set; }
    }

    // ✅ Request for updating marks (e.g. when re-evaluating)
    public class UpdateMarkRequest
    {
        [Range(0, 100, ErrorMessage = "Score must be between 0 and 100")]
        public decimal Score { get; set; }
    }
}
