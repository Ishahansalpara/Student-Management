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
    public class ProfessorSubjectController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfessorSubjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get all professor-subject assignments (Admin only)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ProfessorSubjectDTO>>> GetAllAssignments()
        {
            var assignments = await _context.ProfessorSubjects
                .Include(ps => ps.Professor).ThenInclude(p => p.User)
                .Include(ps => ps.Subject)
                .Select(ps => new ProfessorSubjectDTO
                {
                    ProfessorId = ps.ProfessorId,
                    ProfessorName = ps.Professor != null && ps.Professor.User != null
                        ? ps.Professor.User.FirstName + " " + ps.Professor.User.LastName
                        : "N/A",
                    SubjectId = ps.SubjectId,
                    SubjectName = ps.Subject != null ? ps.Subject.Name : "N/A"
                })
                .ToListAsync();

            return Ok(assignments);
        }

        // ✅ Get subjects by professor (Admin only)
        [HttpGet("professor/{professorId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ProfessorSubjectDTO>>> GetSubjectsByProfessor(int professorId)
        {
            if (!await _context.Professors.AnyAsync(p => p.Id == professorId))
                return NotFound("Professor not found.");

            var subjects = await _context.ProfessorSubjects
                .Where(ps => ps.ProfessorId == professorId)
                .Include(ps => ps.Subject)
                .Include(ps => ps.Professor).ThenInclude(p => p.User)
                .Select(ps => new ProfessorSubjectDTO
                {
                    ProfessorId = ps.ProfessorId,
                    ProfessorName = ps.Professor.User.FirstName + " " + ps.Professor.User.LastName,
                    SubjectId = ps.SubjectId,
                    SubjectName = ps.Subject.Name
                })
                .ToListAsync();

            return Ok(subjects);
        }

        // ✅ NEW: Get subjects for the logged-in professor (auto-detect from token)
        [HttpGet("my-subjects")]
        [Authorize(Roles = "Professor")]
        public async Task<ActionResult<IEnumerable<ProfessorSubjectDTO>>> GetMySubjects()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("Invalid token: user ID not found.");

            int userId = int.Parse(userIdClaim);

            var professor = await _context.Professors
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (professor == null)
                return NotFound("Professor record not found for this user.");

            var subjects = await _context.ProfessorSubjects
                .Where(ps => ps.ProfessorId == professor.Id)
                .Include(ps => ps.Subject)
                .Include(ps => ps.Professor).ThenInclude(p => p.User)
                .Select(ps => new ProfessorSubjectDTO
                {
                    ProfessorId = ps.ProfessorId,
                    ProfessorName = ps.Professor.User.FirstName + " " + ps.Professor.User.LastName,
                    SubjectId = ps.SubjectId,
                    SubjectName = ps.Subject.Name
                })
                .ToListAsync();

            if (subjects.Count == 0)
                return NotFound("No subjects assigned to this professor.");

            return Ok(subjects);
        }

        // ✅ Get all professors assigned to a specific subject (Admin only)
        [HttpGet("subject/{subjectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ProfessorSubjectDTO>>> GetProfessorsBySubject(int subjectId)
        {
            if (!await _context.Subjects.AnyAsync(s => s.Id == subjectId))
                return NotFound("Subject not found.");

            var professors = await _context.ProfessorSubjects
                .Where(ps => ps.SubjectId == subjectId)
                .Include(ps => ps.Subject)
                .Include(ps => ps.Professor).ThenInclude(p => p.User)
                .Select(ps => new ProfessorSubjectDTO
                {
                    ProfessorId = ps.ProfessorId,
                    ProfessorName = ps.Professor.User.FirstName + " " + ps.Professor.User.LastName,
                    SubjectId = ps.SubjectId,
                    SubjectName = ps.Subject.Name
                })
                .ToListAsync();

            return Ok(professors);
        }

        // ✅ Assign subject to professor (Admin only)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProfessorSubjectDTO>> AssignSubject(AssignProfessorSubjectRequest request)
        {
            if (request.ProfessorId <= 0 || request.SubjectId <= 0)
                return BadRequest("Invalid professor or subject ID.");

            if (!await _context.Professors.AnyAsync(p => p.Id == request.ProfessorId))
                return NotFound("Professor not found.");
            if (!await _context.Subjects.AnyAsync(s => s.Id == request.SubjectId))
                return NotFound("Subject not found.");

            var exists = await _context.ProfessorSubjects
                .AnyAsync(ps => ps.ProfessorId == request.ProfessorId && ps.SubjectId == request.SubjectId);

            if (exists)
                return Conflict("This professor is already assigned to this subject.");

            var mapping = new ProfessorSubject
            {
                ProfessorId = request.ProfessorId,
                SubjectId = request.SubjectId
            };

            _context.ProfessorSubjects.Add(mapping);
            await _context.SaveChangesAsync();

            var dto = new ProfessorSubjectDTO
            {
                ProfessorId = request.ProfessorId,
                SubjectId = request.SubjectId,
                ProfessorName = await _context.Users
                    .Where(u => u.Id == _context.Professors
                        .Where(p => p.Id == request.ProfessorId)
                        .Select(p => p.UserId).FirstOrDefault())
                    .Select(u => u.FirstName + " " + u.LastName)
                    .FirstOrDefaultAsync() ?? "N/A",
                SubjectName = await _context.Subjects
                    .Where(s => s.Id == request.SubjectId)
                    .Select(s => s.Name)
                    .FirstOrDefaultAsync() ?? "N/A"
            };

            return CreatedAtAction(nameof(GetSubjectsByProfessor),
                new { professorId = request.ProfessorId }, dto);
        }

        // ✅ Remove assignment (Admin only)
        [HttpDelete("{professorId}/{subjectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveAssignment(int professorId, int subjectId)
        {
            var mapping = await _context.ProfessorSubjects
                .FirstOrDefaultAsync(ps => ps.ProfessorId == professorId && ps.SubjectId == subjectId);

            if (mapping == null)
                return NotFound("Assignment not found.");

            _context.ProfessorSubjects.Remove(mapping);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Assignment removed successfully." });
        }
    }
}
