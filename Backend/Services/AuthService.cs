using System;
using System.Security.Cryptography;
using System.Text;
using StudentManagementSystem.Data;
using StudentManagementSystem.DTOs;
using StudentManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace StudentManagementSystem.Services
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;

        public AuthService(ApplicationDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // 🔹 LOGIN
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid email or password");

            if (!user.IsActive)
                throw new UnauthorizedAccessException("User account is inactive");

            var token = _jwtService.GenerateToken(user.Id, user.Email, user.Role);

            return new LoginResponse
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Token = token
            };
        }

        // 🔹 REGISTER
        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
                throw new InvalidOperationException("Email already registered");

            // Ensure role is valid
            var validRoles = new[] { "Student", "Professor", "Admin" };
            var role = validRoles.Contains(request.Role) ? request.Role : "Student";

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = HashPassword(request.Password),
                Role = role,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Create related entity based on role
            if (role == "Student")
            {
                var student = new Student
                {
                    UserId = user.Id,
                    RegistrationNumber = $"STU{user.Id:D6}",
                    EnrollmentDate = DateTime.UtcNow
                };
                _context.Students.Add(student);
            }
            else if (role == "Professor")
            {
                var professor = new Professor
                {
                    UserId = user.Id,
                    EmployeeId = $"PROF{user.Id:D6}",
                    Department = "General",
                    JoiningDate = DateTime.UtcNow
                };
                _context.Professors.Add(professor);
            }
            else if (role == "Admin")
            {
                var admin = new Admin
                {
                    UserId = user.Id,
                    EmployeeId = $"ADM{user.Id:D6}",
                    CreatedAt = DateTime.UtcNow
                };
                _context.Admins.Add(admin);
            }

            await _context.SaveChangesAsync();

            return new RegisterResponse
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Message = "Registration successful"
            };
        }

        // 🔹 PASSWORD HELPERS
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == hash;
        }
    }
}
