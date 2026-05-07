CREATE TABLE IF NOT EXISTS tags (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS file_tags (
  file_id UUID NOT NULL,
  tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_file_tag UNIQUE (file_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_file_tags_file_id
ON file_tags(file_id);