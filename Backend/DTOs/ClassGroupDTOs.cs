namespace StudentManagementSystem.DTOs
{
    public class ClassGroupDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public int? ProfessorId { get; set; }
        public string ProfessorName { get; set; } = string.Empty;
        public int StudentCount { get; set; }
    }

    public class CreateClassGroupRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public int? ProfessorId { get; set; }
    }

    public class UpdateClassGroupRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty;
    }
}
