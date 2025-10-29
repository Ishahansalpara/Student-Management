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
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get all courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Subjects)
                .Select(c => new CourseDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    Subjects = c.Subjects.Select(s => new SubjectDTO
                    {
                        Id = s.Id,
                        Name = s.Name,
                        Description = s.Description
                    }).ToList()
                }).ToListAsync();

            return Ok(courses);
        }

        // ✅ Get single course by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDTO>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Subjects)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound();

            return Ok(new CourseDTO
            {
                Id = course.Id,
                Name = course.Name,
                Description = course.Description,
                Subjects = course.Subjects.Select(s => new SubjectDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description
                }).ToList()
            });
        }

        // ✅ Create course (Admin)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CourseDTO>> CreateCourse(CreateCourseRequest request)
        {
            var course = new Course
            {
                Name = request.Name,
                Description = request.Description
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }

        // ✅ Update course (Admin)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(int id, UpdateCourseRequest request)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound();

            course.Name = request.Name;
            course.Description = request.Description;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ Delete course (Admin)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound();

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
