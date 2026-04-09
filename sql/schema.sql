CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL UNIQUE,
  business_size TEXT NOT NULL,
  user_range TEXT NOT NULL,
  threat_prevention_gbps NUMERIC(8, 2) NOT NULL CHECK (threat_prevention_gbps > 0),
  overview_points TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_sort_order_idx ON products (sort_order, model_name);
