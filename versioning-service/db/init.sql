CREATE TABLE IF NOT EXISTS file_versions (
  id BIGSERIAL PRIMARY KEY,
  file_id UUID NOT NULL,
  version_no INTEGER NOT NULL,
  metadata_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_file_version UNIQUE (file_id, version_no)
);

CREATE INDEX IF NOT EXISTS idx_file_versions_file_id
ON file_versions(file_id);