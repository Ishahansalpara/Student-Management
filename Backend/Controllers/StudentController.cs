using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;
using StudentManagementSystem.DTOs;
using System.Security.Claims;

namespace StudentManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Student")]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        [HttpGet("profile")]
        public async Task<ActionResult> GetProfile()
        {
            var userId = GetCurrentUserId();
            var student = await _context.Students
                .Include(s => s.User)
                .Include(s => s.ClassGroup)
                .FirstOrDefaultAsync(s => s.User.Id == userId);

            if (student == null)
                return NotFound();

            return Ok(new StudentDTO
            {
                Id = student.Id,
                Email = student.User.Email,
                FirstName = student.User.FirstName,
                LastName = student.User.LastName,
                RegistrationNumber = student.RegistrationNumber,
                ClassGroupId = student.ClassGroupId,
                ClassName = student.ClassGroup?.Name,
                EnrollmentDate = student.EnrollmentDate
            });
        }

        [HttpGet("attendance")]
        public async Task<ActionResult<IEnumerable<AttendanceDTO>>> GetMyAttendance()
        {
            var userId = GetCurrentUserId();
            var student = await _context.Students.FirstOrDefaultAsync(s => s.User.Id == userId);

            if (student == null)
                return NotFound();

            var attendances = await _context.Attendances
                .Where(a => a.StudentId == student.Id)
                .Include(a => a.Student)
                .ThenInclude(s => s.User)
                .Select(a => new AttendanceDTO
                {
                    Id = a.Id,
                    StudentId = a.StudentId,
                    StudentName = a.Student.User.FirstName + " " + a.Student.User.LastName,
                    ClassGroupId = a.ClassGroupId,
                    Date = a.Date,
                    IsPresent = a.IsPresent,
                    Remarks = a.Remarks
                })
                .ToListAsync();

            return Ok(attendances);
        }

        [HttpGet("marks")]
        public async Task<ActionResult<IEnumerable<MarkDTO>>> GetMyMarks()
        {
            var userId = GetCurrentUserId();
            var student = await _context.Students.FirstOrDefaultAsync(s => s.User.Id == userId);

            if (student == null)
                return NotFound();

            var marks = await _context.Marks
                .Where(m => m.StudentId == student.Id)
                .Include(m => m.Student)
                .ThenInclude(s => s.User)
                .Include(m => m.Subject)
                .Select(m => new MarkDTO
                {
                    Id = m.Id,
                    StudentId = m.StudentId,
                    StudentName = m.Student.User.FirstName + " " + m.Student.User.LastName,
                    SubjectId = m.SubjectId,
                    SubjectName = m.Subject.Name,
                    Score = m.Score,
                    Grade = m.Grade,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync();

            return Ok(marks);
        }

        [HttpGet("course/{courseId}")]
        [Authorize(Roles = "Admin,Professor")] // ✅ Add this line
        public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetSubjectsByCourse(int courseId)
        {
            var subjects = await _context.Subjects
                .Where(s => s.CourseId == courseId)
                .Include(s => s.Course)
                .Select(s => new SubjectDTO
                {
                    Id = s.Id,
                    CourseId = s.CourseId,
                    CourseName = s.Course.Name,
                    Name = s.Name,
                    Description = s.Description,
                    SyllabusUrl = s.SyllabusUrl,
                    CreatedAt = s.CreatedAt
                })
                .ToListAsync();

            return Ok(subjects);
        }
    }
}
