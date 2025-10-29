namespace StudentManagementSystem.DTOs
{
    public class CourseDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Credits { get; set; }
        public int ProfessorId { get; set; }
        public string ProfessorName { get; set; } = string.Empty;
        public List<SubjectDTO> Subjects { get; set; } = new();
        public DateTime CreatedAt { get; set; }
    }

    public class CreateCourseRequest
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Credits { get; set; }
        public int ProfessorId { get; set; }
    }

    public class UpdateCourseRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Credits { get; set; }
    }
}
