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
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get attendance by class group
        [HttpGet("classgroup/{classGroupId}")]
        [Authorize(Roles = "Admin,Professor")]
        public async Task<ActionResult<IEnumerable<AttendanceDTO>>> GetByClassGroup(int classGroupId)
        {
            var attendance = await _context.Attendances
                .Where(a => a.ClassGroupId == classGroupId)
                .Include(a => a.Student)
                .ThenInclude(s => s.User)
                .Select(a => new AttendanceDTO
                {
                    Id = a.Id,
                    ClassGroupId = a.ClassGroupId,
                    StudentId = a.StudentId,
                    StudentName = a.Student.User.FirstName + " " + a.Student.User.LastName,
                    Date = a.Date,
                    IsPresent = a.IsPresent,
                    Remarks = a.Remarks
                }).ToListAsync();

            return Ok(attendance);
        }

        // ✅ Record attendance
        [HttpPost]
        [Authorize(Roles = "Professor,Admin")]
        public async Task<ActionResult<AttendanceDTO>> RecordAttendance(CreateAttendanceRequest request)
        {
            if (!await _context.Students.AnyAsync(s => s.Id == request.StudentId))
                return BadRequest("Invalid student ID");

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

            return CreatedAtAction(nameof(GetByClassGroup), new { classGroupId = attendance.ClassGroupId }, attendance);
        }

        // ✅ Delete attendance record
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);
            if (attendance == null)
                return NotFound();

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
