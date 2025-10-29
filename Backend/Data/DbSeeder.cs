using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Data
{
    public static class DbSeeder
    {
        public static void SeedDatabase(ApplicationDbContext context)
        {
            if (context.Users.Any())
                return;

            // =============================
            // ADMIN
            // =============================
            var adminUser = new User
            {
                Email = "admin@sms.com",
                FirstName = "Admin",
                LastName = "User",
                PasswordHash = HashPassword("Admin@123"),
                Role = "Admin",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            context.Users.Add(adminUser);
            context.SaveChanges();

            // =============================
            // PROFESSORS
            // =============================
            var professors = new List<User>
            {
                new User
                {
                    Email = "prof_cse@sms.com",
                    FirstName = "Ravi",
                    LastName = "Kumar",
                    PasswordHash = HashPassword("Prof@123"),
                    Role = "Professor",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new User
                {
                    Email = "prof_it@sms.com",
                    FirstName = "Sneha",
                    LastName = "Patel",
                    PasswordHash = HashPassword("Prof@123"),
                    Role = "Professor",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new User
                {
                    Email = "prof_cloud@sms.com",
                    FirstName = "Vikram",
                    LastName = "Rao",
                    PasswordHash = HashPassword("Prof@123"),
                    Role = "Professor",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };
            context.Users.AddRange(professors);
            context.SaveChanges();

            var professorCSE = new Professor
            {
                UserId = professors[0].Id,
                EmployeeId = "PROF001",
                Department = "Science and Technology",
                JoiningDate = DateTime.UtcNow.AddYears(-6)
            };
            var professorIT = new Professor
            {
                UserId = professors[1].Id,
                EmployeeId = "PROF002",
                Department = "Science and Technology",
                JoiningDate = DateTime.UtcNow.AddYears(-5)
            };
            var professorCloud = new Professor
            {
                UserId = professors[2].Id,
                EmployeeId = "PROF003",
                Department = "Science and Technology",
                JoiningDate = DateTime.UtcNow.AddYears(-3)
            };
            context.Professors.AddRange(professorCSE, professorIT, professorCloud);
            context.SaveChanges();

            // =============================
            // COURSES
            // =============================
            var courses = new List<Course>
            {
                new Course
                {
                    Code = "BTECH-CSE",
                    Name = "B.Tech Computer Science & Engineering",
                    Description = "Focus on programming, algorithms, databases, and operating systems.",
                    Credits = 160,
                    ProfessorId = professorCSE.Id,
                    CreatedAt = DateTime.UtcNow
                },
                new Course
                {
                    Code = "BTECH-IT",
                    Name = "B.Tech Information Technology",
                    Description = "Covers software engineering, networking, and information systems.",
                    Credits = 160,
                    ProfessorId = professorIT.Id,
                    CreatedAt = DateTime.UtcNow
                },
                new Course
                {
                    Code = "BTECH-CC",
                    Name = "B.Tech Cloud Computing",
                    Description = "Focus on cloud infrastructure, virtualization, and service models.",
                    Credits = 160,
                    ProfessorId = professorCloud.Id,
                    CreatedAt = DateTime.UtcNow
                }
            };
            context.Courses.AddRange(courses);
            context.SaveChanges();

            // =============================
            // SUBJECTS
            // =============================
            var subjects = new List<Subject>
            {
                // CSE
                new Subject { CourseId = courses[0].Id, Name = "Database Management Systems", Description = "Covers relational databases, SQL, and normalization.", SyllabusUrl = "https://example.com/dbms", CreatedAt = DateTime.UtcNow },
                new Subject { CourseId = courses[0].Id, Name = "Operating Systems", Description = "Processes, threads, and memory management concepts.", SyllabusUrl = "https://example.com/os", CreatedAt = DateTime.UtcNow },
                new Subject { CourseId = courses[0].Id, Name = "Data Structures & Algorithms", Description = "Core algorithms and data organization techniques.", SyllabusUrl = "https://example.com/dsa", CreatedAt = DateTime.UtcNow },

                // IT
                new Subject { CourseId = courses[1].Id, Name = "Software Engineering", Description = "Software lifecycle, requirements, and agile development.", SyllabusUrl = "https://example.com/se", CreatedAt = DateTime.UtcNow },
                new Subject { CourseId = courses[1].Id, Name = "Web Technologies", Description = "HTML, CSS, JavaScript, and web frameworks.", SyllabusUrl = "https://example.com/webtech", CreatedAt = DateTime.UtcNow },
                new Subject { CourseId = courses[1].Id, Name = "Python Programming", Description = "Programming with Python for data and automation.", SyllabusUrl = "https://example.com/python", CreatedAt = DateTime.UtcNow },

                // Cloud
                new Subject { CourseId = courses[2].Id, Name = "Introduction to Cloud Computing", Description = "Basics of cloud models and virtualization.", SyllabusUrl = "https://example.com/cloudintro", CreatedAt = DateTime.UtcNow },
                new Subject { CourseId = courses[2].Id, Name = "Infrastructure & Resource Management in Cloud", Description = "Managing compute, storage, and network resources.", SyllabusUrl = "https://example.com/cloudinfra", CreatedAt = DateTime.UtcNow },
                new Subject { CourseId = courses[2].Id, Name = "Machine Learning for Cloud", Description = "Applying ML in cloud platforms and scalable systems.", SyllabusUrl = "https://example.com/mlcloud", CreatedAt = DateTime.UtcNow }
            };
            context.Subjects.AddRange(subjects);
            context.SaveChanges();

            // =============================
            // CLASS GROUPS
            // =============================
            var groups = new List<ClassGroup>
            {
                new ClassGroup { Name = "CSE-A", ProfessorId = professorCSE.Id, CourseId = courses[0].Id, Schedule = "Mon-Wed 10:00 AM - 12:00 PM", CreatedAt = DateTime.UtcNow },
                new ClassGroup { Name = "IT-A", ProfessorId = professorIT.Id, CourseId = courses[1].Id, Schedule = "Tue-Thu 9:00 AM - 11:00 AM", CreatedAt = DateTime.UtcNow },
                new ClassGroup { Name = "CC-A", ProfessorId = professorCloud.Id, CourseId = courses[2].Id, Schedule = "Mon-Wed 2:00 PM - 4:00 PM", CreatedAt = DateTime.UtcNow }
            };
            context.ClassGroups.AddRange(groups);
            context.SaveChanges();

            // =============================
            // STUDENTS
            // =============================
            var studentUsers = new List<User>();
            for (int i = 1; i <= 9; i++)
            {
                studentUsers.Add(new User
                {
                    Email = $"student{i}@sms.com",
                    FirstName = $"Student{i}",
                    LastName = $"User{i}",
                    PasswordHash = HashPassword("Student@123"),
                    Role = "Student",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                });
            }
            context.Users.AddRange(studentUsers);
            context.SaveChanges();

            // Assign students to groups (3 each)
            var students = new List<Student>();
            for (int i = 0; i < studentUsers.Count; i++)
            {
                var groupId = groups[i / 3].Id; // first 3 -> CSE-A, next 3 -> IT-A, last 3 -> CC-A
                students.Add(new Student
                {
                    UserId = studentUsers[i].Id,
                    RegistrationNumber = $"STU{studentUsers[i].Id:D4}",
                    ClassGroupId = groupId,
                    EnrollmentDate = DateTime.UtcNow.AddMonths(-6)
                });
            }
            context.Students.AddRange(students);
            context.SaveChanges();

            // =============================
            // ATTENDANCE
            // =============================
            foreach (var student in students)
            {
                for (int d = 1; d <= 5; d++)
                {
                    context.Attendances.Add(new Attendance
                    {
                        StudentId = student.Id,
                        ClassGroupId = (int)student.ClassGroupId,
                        Date = DateTime.UtcNow.AddDays(-d),
                        IsPresent = d % 2 == 0,
                        Remarks = d % 2 == 0 ? "Present" : "Absent"
                    });
                }
            }
            context.SaveChanges();

            // =============================
            // MARKS
            // =============================
            var random = new Random();
            var allSubjects = context.Subjects.ToList();

            foreach (var student in students)
            {
                var courseId = context.ClassGroups
                    .Where(g => g.Id == student.ClassGroupId)
                    .Select(g => g.CourseId)
                    .FirstOrDefault();

                var relevantSubjects = allSubjects.Where(s => s.CourseId == courseId).ToList();

                foreach (var subject in relevantSubjects)
                {
                    var score = random.Next(60, 100);
                    context.Marks.Add(new Mark
                    {
                        StudentId = student.Id,
                        SubjectId = subject.Id,
                        Score = score,
                        Grade = CalculateGrade(score),
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }
            context.SaveChanges();
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashed = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashed);
        }

        private static string CalculateGrade(decimal score)
        {
            if (score >= 90) return "A";
            if (score >= 80) return "B";
            if (score >= 70) return "C";
            if (score >= 60) return "D";
            return "F";
        }
    }
}
