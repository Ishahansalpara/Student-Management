namespace StudentManagementSystem.DTOs
{
    public class ProfessorDTO
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";
        public int SubjectCount { get; set; }
        public int ClassGroupCount { get; set; }
    }

    public class CreateProfessorRequest
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
    }

    public class UpdateProfessorRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Department { get; set; }
    }

    public class ProfessorSummaryDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int SubjectCount { get; set; }
    }

    public class ProfessorWithSubjectsDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public List<SubjectDTO> Subjects { get; set; } = new List<SubjectDTO>();
    }

    public class AssignProfessorSubjectRequest
    {
        public int ProfessorId { get; set; }
        public int SubjectId { get; set; }
    }

    public class ProfessorSubjectDTO
    {
        public int ProfessorId { get; set; }
        public string ProfessorName { get; set; } = string.Empty;
        public int SubjectId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
    }
}
