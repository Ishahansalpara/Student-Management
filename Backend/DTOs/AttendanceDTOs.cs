using System;

namespace StudentManagementSystem.DTOs
{
    public class AttendanceDTO
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public int ClassGroupId { get; set; }
        public string? ClassGroupName { get; set; }
        public DateTime Date { get; set; }
        public bool IsPresent { get; set; }
        public string? Remarks { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateAttendanceRequest
    {
        public int StudentId { get; set; }
        public int ClassGroupId { get; set; }
        public DateTime Date { get; set; }
        public bool IsPresent { get; set; }
        public string? Remarks { get; set; }
    }

    public class UpdateAttendanceRequest
    {
        public bool IsPresent { get; set; }
        public string? Remarks { get; set; }
    }
}
