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
    public class SubjectController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ 1. Get all subjects for a specific course
        [HttpGet("course/{courseId}")]
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

        // ✅ 2. Get subjects by professor (NEW)
        [HttpGet("professor/{professorId}")]
        [Authorize(Roles = "Professor,Admin")]
        public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetSubjectsByProfessor(int professorId)
        {
            var subjects = await _context.Subjects
                .Include(s => s.Course)
                .Where(s => s.Course.ProfessorId == professorId)
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

            if (subjects == null || subjects.Count == 0)
                return NotFound(new { message = "No subjects found for this professor." });

            return Ok(subjects);
        }

        // ✅ 3. Create a new subject (Admin only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
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

            return CreatedAtAction(nameof(GetSubjectsByCourse), new { courseId = subject.CourseId }, new SubjectDTO
            {
                Id = subject.Id,
                CourseId = subject.CourseId,
                Name = subject.Name,
                Description = subject.Description,
                SyllabusUrl = subject.SyllabusUrl,
                CreatedAt = subject.CreatedAt
            });
        }

        // ✅ 4. Update subject (Admin only)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSubject(int id, [FromBody] UpdateSubjectRequest request)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
                return NotFound();

            subject.Name = request.Name;
            subject.Description = request.Description;
            subject.SyllabusUrl = request.SyllabusUrl;

            _context.Subjects.Update(subject);
            await _context.SaveChangesAsync();

            return NoContent();
        }
// ✅ 0. Get all subjects (Admin only)
[HttpGet]
[Authorize(Roles = "Admin")]
public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetAllSubjects()
{
    var subjects = await _context.Subjects
        .Include(s => s.Course)
        .Select(s => new SubjectDTO
        {
            Id = s.Id,
            Name = s.Name,
            Description = s.Description,
            SyllabusUrl = s.SyllabusUrl,
            CourseId = s.CourseId,
            CourseName = s.Course.Name,
            CreatedAt = s.CreatedAt
        })
        .ToListAsync();

    return Ok(subjects);
}

        // ✅ 5. Delete subject (Admin only)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSubject(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
                return NotFound();

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

