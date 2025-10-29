using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;
using StudentManagementSystem.DTOs;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Students
        [HttpGet("students")]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetAllStudents()
        {
            var students = await _context.Students
                .Include(s => s.User)
                .Include(s => s.ClassGroup)
                .Select(s => new StudentDTO
                {
                    Id = s.Id,
                    Email = s.User.Email,
                    FirstName = s.User.FirstName,
                    LastName = s.User.LastName,
                    RegistrationNumber = s.RegistrationNumber,
                    ClassGroupId = s.ClassGroupId,
                    ClassName = s.ClassGroup.Name,
                    EnrollmentDate = s.EnrollmentDate
                })
                .ToListAsync();

            return Ok(students);
        }

        [HttpPost("students")]
        public async Task<ActionResult<StudentDTO>> CreateStudent([FromBody] CreateStudentRequest request)
        {
            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = HashPassword("DefaultPassword123!"),
                Role = "Student",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var student = new Student
            {
                UserId = user.Id,
                RegistrationNumber = request.RegistrationNumber,
                ClassGroupId = request.ClassGroupId,
                EnrollmentDate = DateTime.UtcNow
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllStudents), new { id = student.Id }, new StudentDTO
            {
                Id = student.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                RegistrationNumber = student.RegistrationNumber,
                ClassGroupId = student.ClassGroupId,
                EnrollmentDate = student.EnrollmentDate
            });
        }

        [HttpPut("students/{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] UpdateStudentRequest request)
        {
            var student = await _context.Students.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == id);
            if (student == null)
                return NotFound();

            student.User.FirstName = request.FirstName;
            student.User.LastName = request.LastName;
            student.ClassGroupId = request.ClassGroupId;
            student.User.UpdatedAt = DateTime.UtcNow;

            _context.Students.Update(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("students/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Id == id);
            if (student == null)
                return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Professors
        [HttpGet("professors")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllProfessors()
        {
            var professors = await _context.Professors
                .Include(p => p.User)
                .Select(p => new
                {
                    p.Id,
                    p.User.Email,
                    p.User.FirstName,
                    p.User.LastName,
                    p.EmployeeId,
                    p.Department,
                    p.JoiningDate
                })
                .ToListAsync();

            return Ok(professors);
        }

        [HttpPost("professors")]
        public async Task<ActionResult> CreateProfessor([FromBody] CreateProfessorRequest request)
        {
            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = HashPassword("DefaultPassword123!"),
                Role = "Professor",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var professor = new Professor
            {
                UserId = user.Id,
                EmployeeId = request.EmployeeId,
                Department = request.Department,
                JoiningDate = DateTime.UtcNow
            };

            _context.Professors.Add(professor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllProfessors), new { id = professor.Id });
        }

        // Courses
        [HttpGet("courses")]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetAllCourses()
        {
            var courses = await _context.Courses
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
                    ProfessorName = c.Professor.User.FirstName + " " + c.Professor.User.LastName
                })
                .ToListAsync();

            return Ok(courses);
        }

        [HttpPost("courses")]
        public async Task<ActionResult<CourseDTO>> CreateCourse([FromBody] CreateCourseRequest request)
        {
            var course = new Course
            {
                Code = request.Code,
                Name = request.Name,
                Description = request.Description,
                Credits = request.Credits,
                ProfessorId = request.ProfessorId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllCourses), new { id = course.Id });
        }

        [HttpPut("courses/{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] UpdateCourseRequest request)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);
            if (course == null)
                return NotFound();

            course.Name = request.Name;
            course.Description = request.Description;
            course.Credits = request.Credits;

            _context.Courses.Update(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("courses/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);
            if (course == null)
                return NotFound();

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }
// Subjects
[HttpGet("subjects")]
public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetAllSubjects()
{
    var subjects = await _context.Subjects
        .Include(s => s.Course)
        .Include(s => s.Course.Professor)
        .ThenInclude(p => p.User)
        .Select(s => new SubjectDTO
        {
            Id = s.Id,
            CourseId = s.CourseId,
            CourseName = s.Course.Name,
            Name = s.Name,
            Description = s.Description,
            SyllabusUrl = s.SyllabusUrl,
            CreatedAt = s.CreatedAt,
            ProfessorName = s.Course.Professor != null 
                ? s.Course.Professor.User.FirstName + " " + s.Course.Professor.User.LastName 
                : "Unassigned"
        })
        .ToListAsync();

    return Ok(subjects);
}

[HttpPost("subjects")]
public async Task<ActionResult<SubjectDTO>> CreateSubject([FromBody] CreateSubjectRequest request)
{
    if (!await _context.Courses.AnyAsync(c => c.Id == request.CourseId))
        return BadRequest(new { message = "Invalid course ID." });

    var subject = new Subject
    {
        CourseId = request.CourseId,
        Name = request.Name,
        Description = request.Description,
        SyllabusUrl = request.SyllabusUrl,
        CreatedAt = DateTime.UtcNow
    };

    _context.Subjects.Add(subject);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetAllSubjects), new { id = subject.Id }, new SubjectDTO
    {
        Id = subject.Id,
        CourseId = subject.CourseId,
        Name = subject.Name,
        Description = subject.Description,
        SyllabusUrl = subject.SyllabusUrl,
        CreatedAt = subject.CreatedAt
    });
}

[HttpPut("subjects/{id}")]
public async Task<IActionResult> UpdateSubject(int id, [FromBody] UpdateSubjectRequest request)
{
    var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == id);
    if (subject == null)
        return NotFound();

    subject.Name = request.Name;
    subject.Description = request.Description;
    subject.SyllabusUrl = request.SyllabusUrl;
    subject.UpdatedAt = DateTime.UtcNow;

    _context.Subjects.Update(subject);
    await _context.SaveChangesAsync();

    return NoContent();
}

[HttpDelete("subjects/{id}")]
public async Task<IActionResult> DeleteSubject(int id)
{
    var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == id);
    if (subject == null)
        return NotFound();

    _context.Subjects.Remove(subject);
    await _context.SaveChangesAsync();

    return NoContent();
}

        // Class Groups
        [HttpGet("classgroups")]
public async Task<ActionResult<IEnumerable<ClassGroupDTO>>> GetAllClassGroups()
{
    var classGroups = await _context.ClassGroups
        .Include(cg => cg.Course)
        .Include(cg => cg.Professor)
        .ThenInclude(p => p.User)
        .Include(cg => cg.Students)
        .Select(cg => new ClassGroupDTO
        {
            Id = cg.Id,
            Name = cg.Name,
            CourseId = cg.CourseId,
            CourseName = cg.Course.Name,
            // ✅ Fix: handle nullable ProfessorId safely
            ProfessorId = cg.ProfessorId,
            ProfessorName = cg.Professor != null 
                ? cg.Professor.User.FirstName + " " + cg.Professor.User.LastName
                : "Unassigned",
            Schedule = cg.Schedule,
            StudentCount = cg.Students.Count
        })
        .ToListAsync();

    return Ok(classGroups);
}

[HttpPost("classgroups")]
public async Task<ActionResult<ClassGroupDTO>> CreateClassGroup([FromBody] CreateClassGroupRequest request)
{
    // ✅ Fix: handle nullable ProfessorId
    var professorId = request.ProfessorId ?? 0;

    var classGroup = new ClassGroup
    {
        Name = request.Name,
        CourseId = request.CourseId,
        ProfessorId = professorId,
        Schedule = request.Schedule,
        CreatedAt = DateTime.UtcNow
    };

    _context.ClassGroups.Add(classGroup);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetAllClassGroups), new { id = classGroup.Id });
}


        [HttpPut("classgroups/{id}")]
        public async Task<IActionResult> UpdateClassGroup(int id, [FromBody] UpdateClassGroupRequest request)
        {
            var classGroup = await _context.ClassGroups.FirstOrDefaultAsync(cg => cg.Id == id);
            if (classGroup == null)
                return NotFound();

            classGroup.Name = request.Name;
            classGroup.Schedule = request.Schedule;

            _context.ClassGroups.Update(classGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("classgroups/{id}")]
        public async Task<IActionResult> DeleteClassGroup(int id)
        {
            var classGroup = await _context.ClassGroups.FirstOrDefaultAsync(cg => cg.Id == id);
            if (classGroup == null)
                return NotFound();

            _context.ClassGroups.Remove(classGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string HashPassword(string password)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
}
