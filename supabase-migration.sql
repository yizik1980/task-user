-- Supabase Migration: Initial Schema
-- Run this in the Supabase SQL editor (https://app.supabase.com → SQL Editor)

-- Enable UUID generation (available by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email        TEXT        UNIQUE NOT NULL,
  username     TEXT        NOT NULL,
  password     TEXT        NOT NULL,
  first_name   TEXT,
  last_name    TEXT,
  phone        TEXT,
  city         TEXT,
  country      TEXT,
  address      TEXT,
  postal_code  TEXT,
  role         TEXT        NOT NULL DEFAULT 'user',
  is_active    BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TASKS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS tasks (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  description  TEXT,
  status       TEXT        NOT NULL DEFAULT 'pending',   -- pending | in_progress | completed
  priority     TEXT        NOT NULL DEFAULT 'medium',    -- low | medium | high
  due_date     TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_email     ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id   ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status    ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date  ON tasks(due_date);

-- ============================================================
-- ROW LEVEL SECURITY (optional — disable if using service role key)
-- ============================================================
-- The backend uses the service role key which bypasses RLS.
-- If you want to enable RLS for direct client access, uncomment below:
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
