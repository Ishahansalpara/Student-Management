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
    public class MarksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MarksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get all marks by subject
        [HttpGet("subject/{subjectId}")]
        [Authorize(Roles = "Admin,Professor")]
        public async Task<ActionResult<IEnumerable<MarkDTO>>> GetMarksBySubject(int subjectId)
        {
            var marks = await _context.Marks
                .Where(m => m.SubjectId == subjectId)
                .Include(m => m.Student)
                .ThenInclude(s => s.User)
                .Select(m => new MarkDTO
                {
                    Id = m.Id,
                    StudentId = m.StudentId,
                    StudentName = m.Student.User.FirstName + " " + m.Student.User.LastName,
                    SubjectId = m.SubjectId,
                    Score = m.Score,
                    Grade = m.Grade,
                    CreatedAt = m.CreatedAt
                }).ToListAsync();

            return Ok(marks);
        }

        // ✅ Record a new mark
        [HttpPost]
        [Authorize(Roles = "Professor,Admin")]
        public async Task<ActionResult<MarkDTO>> RecordMark(CreateMarkRequest request)
        {
            if (!await _context.Students.AnyAsync(s => s.Id == request.StudentId))
                return BadRequest("Invalid student ID");

            if (!await _context.Subjects.AnyAsync(s => s.Id == request.SubjectId))
                return BadRequest("Invalid subject ID");

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

            return CreatedAtAction(nameof(GetMarksBySubject), new { subjectId = mark.SubjectId }, mark);
        }

        // ✅ Delete mark (Admin)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMark(int id)
        {
            var mark = await _context.Marks.FindAsync(id);
            if (mark == null)
                return NotFound();

            _context.Marks.Remove(mark);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ Grade calculator
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
