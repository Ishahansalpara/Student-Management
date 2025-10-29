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
    public class ClassGroupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClassGroupController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get all class groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassGroupDTO>>> GetClassGroups()
        {
            var groups = await _context.ClassGroups
                .Include(g => g.Course)
                .Select(g => new ClassGroupDTO
                {
                    Id = g.Id,
                    Name = g.Name,
                    CourseId = g.CourseId,
                    CourseName = g.Course.Name
                }).ToListAsync();

            return Ok(groups);
        }

        // ✅ Get by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassGroupDTO>> GetClassGroup(int id)
        {
            var group = await _context.ClassGroups
                .Include(g => g.Course)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (group == null)
                return NotFound();

            return Ok(new ClassGroupDTO
            {
                Id = group.Id,
                Name = group.Name,
                CourseId = group.CourseId,
                CourseName = group.Course.Name
            });
        }

        // ✅ Create (Admin)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ClassGroup>> CreateClassGroup(CreateClassGroupRequest request)
        {
            if (!await _context.Courses.AnyAsync(c => c.Id == request.CourseId))
                return BadRequest("Invalid Course ID");

            var group = new ClassGroup
            {
                Name = request.Name,
                CourseId = request.CourseId
            };

            _context.ClassGroups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClassGroup), new { id = group.Id }, group);
        }

        // ✅ Update (Admin)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateClassGroup(int id, UpdateClassGroupRequest request)
        {
            var group = await _context.ClassGroups.FindAsync(id);
            if (group == null)
                return NotFound();

            group.Name = request.Name;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ Delete (Admin)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteClassGroup(int id)
        {
            var group = await _context.ClassGroups.FindAsync(id);
            if (group == null)
                return NotFound();

            _context.ClassGroups.Remove(group);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
