
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
