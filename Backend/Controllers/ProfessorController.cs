using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;
using StudentManagementSystem.DTOs;
using StudentManagementSystem.Models;
using System.Security.Claims;

namespace StudentManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Professor")]
    public class ProfessorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfessorController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        // ✅ Get Professor Profile
        [HttpGet("profile")]
        public async Task<ActionResult> GetProfile()
        {
            var userId = GetCurrentUserId();
            var professor = await _context.Professors
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.User.Id == userId);

            if (professor == null)
                return NotFound("Professor not found.");

            return Ok(new
            {
                professor.Id,
                Email = professor.User?.Email ?? "N/A",
                FirstName = professor.User?.FirstName ?? "N/A",
                LastName = professor.User?.LastName ?? "N/A",
                professor.EmployeeId,
                professor.Department,
                professor.JoiningDate
            });
        }

        // ✅ Get Professor's Courses
        [HttpGet("courses")]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetMyCourses()
        {
            var userId = GetCurrentUserId();
            var professor = await _context.Professors
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.User.Id == userId);

            if (professor == null)
                return NotFound("Professor not found.");

            var courses = await _context.Courses
                .Where(c => c.ProfessorId == professor.Id)
                .Include(c => c.Professor)
                .ThenInclude(p => p.User)
                .Select(c => new CourseDTO
                {
                    Id = c.Id,
                    Code = c.Code,
                    Name = c.Name,
                    Description = c.Description,
                    Credits = c.Credits,
                    ProfessorId = c.ProfessorId,
                    ProfessorName = c.Professor != null && c.Professor.User != null
                        ? c.Professor.User.FirstName + " " + c.Professor.User.LastName
                        : "N/A"
                })
                .ToListAsync();

            return Ok(courses);
        }

        // ✅ Get Professor's Class Groups
        [HttpGet("classgroups")]
        public async Task<ActionResult<IEnumerable<ClassGroupDTO>>> GetMyClassGroups()
        {
            var userId = GetCurrentUserId();
            var professor = await _context.Professors
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.User.Id == userId);

            if (professor == null)
                return NotFound("Professor not found.");

            var classGroups = await _context.ClassGroups
                .Where(cg => cg.ProfessorId == professor.Id)
                .Include(cg => cg.Course)
                .Include(cg => cg.Professor)
                .ThenInclude(p => p.User)
                .Include(cg => cg.Students)
                .Select(cg => new ClassGroupDTO
                {
                    Id = cg.Id,
                    Name = cg.Name,
                    CourseId = cg.CourseId,
                    CourseName = cg.Course != null ? cg.Course.Name : "N/A",
                    ProfessorId = cg.ProfessorId,
                    ProfessorName = cg.Professor != null && cg.Professor.User != null
                        ? cg.Professor.User.FirstName + " " + cg.Professor.User.LastName
                        : "N/A",
                    Schedule = cg.Schedule,
                    StudentCount = cg.Students.Count
                })
                .ToListAsync();

            return Ok(classGroups);
        }

        // ✅ NEW: Get Subjects for a Course (for dropdowns)
        [HttpGet("subjects/{courseId}")]
        public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetSubjectsForCourse(int courseId)
        {
            var userId = GetCurrentUserId();
            var professor = await _context.Professors
                .FirstOrDefaultAsync(p => p.User.Id == userId);

            if (professor == null)
                return NotFound("Professor not found.");

            // Ensure the course belongs to this professor
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == courseId && c.ProfessorId == professor.Id);

            if (course == null)
                return Forbid("You are not assigned to this course.");

            var subjects = await _context.Subjects
                .Where(s => s.CourseId == courseId)
                .Select(s => new SubjectDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    CourseId = s.CourseId,
                    CourseName = course.Name
                })
                .ToListAsync();

            return Ok(subjects);
        }

        // ✅ Get Students of a ClassGroup
        [HttpGet("classgroups/{classGroupId}/students")]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetClassGroupStudents(int classGroupId)
        {
            var students = await _context.Students
                .Where(s => s.ClassGroupId == classGroupId)
                .Include(s => s.User)
                .Include(s => s.ClassGroup)
                .Select(s => new StudentDTO
                {
                    Id = s.Id,
                    Email = s.User != null ? s.User.Email : "N/A",
                    FirstName = s.User != null ? s.User.FirstName : "N/A",
                    LastName = s.User != null ? s.User.LastName : "N/A",
                    RegistrationNumber = s.RegistrationNumber,
                    ClassGroupId = s.ClassGroupId,
                    ClassName = s.ClassGroup != null ? s.ClassGroup.Name : "N/A",
                    EnrollmentDate = s.EnrollmentDate
                })
                .ToListAsync();

            return Ok(students);
        }

        // ✅ Record Attendance
        [HttpPost("attendance")]
        public async Task<ActionResult<AttendanceDTO>> RecordAttendance([FromBody] CreateAttendanceRequest request)
        {
            if (!_context.Students.Any(s => s.Id == request.StudentId))
                return BadRequest("Invalid student ID.");

            if (!_context.ClassGroups.Any(cg => cg.Id == request.ClassGroupId))
                return BadRequest("Invalid class group ID.");

            if (request.Date > DateTime.UtcNow)
                return BadRequest("Attendance date cannot be in the future.");

            var existingAttendance = await _context.Attendances
                .FirstOrDefaultAsync(a =>
                    a.StudentId == request.StudentId &&
                    a.ClassGroupId == request.ClassGroupId &&
                    a.Date.Date == request.Date.Date);

            if (existingAttendance != null)
                return Conflict("Attendance for this student on the given date already exists.");

            var attendance = new Attendance
            {
                StudentId = request.StudentId,
                ClassGroupId = request.ClassGroupId,
                Date = request.Date,
                IsPresent = request.IsPresent,
                Remarks = request.Remarks
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            var dto = new AttendanceDTO
            {
                Id = attendance.Id,
                StudentId = attendance.StudentId,
                ClassGroupId = attendance.ClassGroupId,
                Date = attendance.Date,
                IsPresent = attendance.IsPresent,
                Remarks = attendance.Remarks
            };

            return CreatedAtAction(nameof(GetAttendance), new { classGroupId = attendance.ClassGroupId }, dto);
        }

        // ✅ Get Attendance by ClassGroup
        [HttpGet("attendance/{classGroupId}")]
        public async Task<ActionResult<IEnumerable<AttendanceDTO>>> GetAttendance(int classGroupId)
        {
            var attendances = await _context.Attendances
                .Where(a => a.ClassGroupId == classGroupId)
                .Include(a => a.Student)
                .ThenInclude(s => s.User)
                .Select(a => new AttendanceDTO
                {
                    Id = a.Id,
                    StudentId = a.StudentId,
                    StudentName = a.Student != null && a.Student.User != null
                        ? a.Student.User.FirstName + " " + a.Student.User.LastName
                        : "N/A",
                    ClassGroupId = a.ClassGroupId,
                    Date = a.Date,
                    IsPresent = a.IsPresent,
                    Remarks = a.Remarks
                })
                .ToListAsync();

            return Ok(attendances);
        }

        // ✅ Record Marks
        [HttpPost("marks")]
        public async Task<ActionResult<MarkDTO>> RecordMark([FromBody] CreateMarkRequest request)
        {
            if (!_context.Students.Any(s => s.Id == request.StudentId))
                return BadRequest("Invalid student ID.");

            if (!_context.Subjects.Any(s => s.Id == request.SubjectId))
                return BadRequest("Invalid subject ID.");

            if (request.Score < 0 || request.Score > 100)
                return BadRequest("Score must be between 0 and 100.");

            var existingMark = await _context.Marks
                .FirstOrDefaultAsync(m => m.StudentId == request.StudentId && m.SubjectId == request.SubjectId);

            if (existingMark != null)
                return Conflict("Marks for this student and subject already exist.");

            var mark = new Mark
            {
                StudentId = request.StudentId,
                SubjectId = request.SubjectId,
                Score = request.Score,
                Grade = CalculateGrade(request.Score),
                CreatedAt = DateTime.UtcNow
            };

            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();

            var dto = new MarkDTO
            {
                Id = mark.Id,
                StudentId = mark.StudentId,
                SubjectId = mark.SubjectId,
                Score = mark.Score,
                Grade = mark.Grade,
                CreatedAt = mark.CreatedAt
            };

            return CreatedAtAction(nameof(GetMarks), new { subjectId = mark.SubjectId }, dto);
        }

        // ✅ Get Marks for Subject
        [HttpGet("marks/{subjectId}")]
        public async Task<ActionResult<IEnumerable<MarkDTO>>> GetMarks(int subjectId)
        {
            var marks = await _context.Marks
                .Where(m => m.SubjectId == subjectId)
                .Include(m => m.Student)
                .ThenInclude(s => s.User)
                .Include(m => m.Subject)
                .Select(m => new MarkDTO
                {
                    Id = m.Id,
                    StudentId = m.StudentId,
                    StudentName = m.Student != null && m.Student.User != null
                        ? m.Student.User.FirstName + " " + m.Student.User.LastName
                        : "N/A",
                    SubjectId = m.SubjectId,
                    SubjectName = m.Subject != null ? m.Subject.Name : "N/A",
                    Score = m.Score,
                    Grade = m.Grade,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync();

            return Ok(marks);
        }

        // ✅ Grade Calculator
        private string CalculateGrade(decimal score)
        {
            if (score >= 90) return "A";
            if (score >= 80) return "B";
            if (score >= 70) return "C";
            if (score >= 60) return "D";
            return "F";
        }
    }
}
