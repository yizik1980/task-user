-- Create Tasks Table
CREATE TABLE Tasks (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    status NVARCHAR(50) DEFAULT 'pending',
    priority NVARCHAR(50) DEFAULT 'medium',
    dueDate DATETIME,
    completedAt DATETIME,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
GO

-- Create Indexes for faster queries
CREATE INDEX IX_Tasks_UserId ON Tasks(userId);
CREATE INDEX IX_Tasks_Status ON Tasks(status);
CREATE INDEX IX_Tasks_Priority ON Tasks(priority);
CREATE INDEX IX_Tasks_DueDate ON Tasks(dueDate);
GO

-- Insert Sample Tasks
INSERT INTO Tasks (userId, title, description, status, priority, dueDate)
VALUES 
    (1, 'Complete project documentation', 'Write comprehensive documentation for the Angular client project', 'in-progress', 'high', '2026-02-20'),
    (1, 'Setup database backup', 'Configure automated daily backups for the PohlimDB', 'pending', 'high', '2026-02-18'),
    (2, 'Design UI mockups', 'Create mockups for new dashboard features', 'completed', 'medium', '2026-02-10'),
    (2, 'API Integration testing', 'Test all backend API endpoints', 'in-progress', 'high', '2026-02-22'),
    (3, 'Code review', 'Review pull requests from team members', 'pending', 'medium', '2026-02-19'),
    (3, 'Performance optimization', 'Optimize database queries for better performance', 'pending', 'low', '2026-03-01'),
    (4, 'User authentication', 'Implement JWT authentication', 'in-progress', 'high', '2026-02-25'),
    (4, 'Write unit tests', 'Add unit tests for backend services', 'pending', 'medium', '2026-02-28'),
    (5, 'Bug fixes', 'Fix reported bugs from beta testing', 'completed', 'high', '2026-02-12'),
    (1, 'Deploy to staging', 'Deploy latest build to staging environment', 'pending', 'high', '2026-02-17');
GO

-- Verify Tasks table
SELECT * FROM Tasks;
GO
