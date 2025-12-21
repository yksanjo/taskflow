-- Seed data for development

-- Insert sample user
INSERT INTO users (email, password, name, role) VALUES
  ('demo@taskflow.com', '$2a$10$rOzJqZqZqZqZqZqZqZqZqO', 'Demo User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample project
INSERT INTO projects (name, description, color, user_id) VALUES
  ('Sample Project', 'A sample project for testing', '#3B82F6', (SELECT id FROM users WHERE email = 'demo@taskflow.com'))
ON CONFLICT DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, user_id, project_id, due_date, estimated_hours) VALUES
  ('Setup development environment', 'Set up local development environment with all required tools', 'completed', 'high', (SELECT id FROM users WHERE email = 'demo@taskflow.com'), (SELECT id FROM projects LIMIT 1), NOW() + INTERVAL '1 day', 4),
  ('Design database schema', 'Create comprehensive database schema for tasks, projects, and users', 'in_progress', 'high', (SELECT id FROM users WHERE email = 'demo@taskflow.com'), (SELECT id FROM projects LIMIT 1), NOW() + INTERVAL '2 days', 6),
  ('Implement authentication', 'Build user authentication and authorization system', 'todo', 'high', (SELECT id FROM users WHERE email = 'demo@taskflow.com'), (SELECT id FROM projects LIMIT 1), NOW() + INTERVAL '3 days', 8),
  ('Create task management API', 'Build REST API for task CRUD operations', 'todo', 'medium', (SELECT id FROM users WHERE email = 'demo@taskflow.com'), (SELECT id FROM projects LIMIT 1), NOW() + INTERVAL '5 days', 12),
  ('Build frontend dashboard', 'Create React dashboard with task list and board views', 'todo', 'medium', (SELECT id FROM users WHERE email = 'demo@taskflow.com'), (SELECT id FROM projects LIMIT 1), NOW() + INTERVAL '7 days', 16)
ON CONFLICT DO NOTHING;

