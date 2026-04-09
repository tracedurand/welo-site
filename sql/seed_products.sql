INSERT INTO products (
  model_name,
  business_size,
  user_range,
  threat_prevention_gbps,
  overview_points,
  sort_order
)
VALUES
  ('Welo FW-120', 'Small Business', 'Up to 50 users', 2.00, ARRAY['Integrated SD-WAN and VPN', 'Centralized cloud management'], 10),
  ('Welo FW-180', 'Small Business', 'Up to 120 users', 3.50, ARRAY['Inline malware and phishing prevention', 'Dual WAN high availability'], 20),
  ('Welo FW-240', 'Branch Office', 'Up to 250 users', 5.00, ARRAY['Zero-trust segmentation policies', 'Remote worker secure access support'], 30),
  ('Welo FW-320', 'Branch Office', 'Up to 500 users', 8.00, ARRAY['SSL/TLS decryption with policy controls', 'Automated compliance policy templates'], 40),
  ('Welo FW-480', 'Mid-Market', '500 to 1,000 users', 12.00, ARRAY['AI-powered anomaly and lateral movement detection', 'High-density 10GbE interfaces'], 50),
  ('Welo FW-560', 'Mid-Market', '1,000 to 2,000 users', 18.00, ARRAY['Built-in DNS security and data leak controls', 'API-first integration with SIEM/SOAR tools'], 60),
  ('Welo FW-720', 'Regional Enterprise', '2,000 to 5,000 users', 25.00, ARRAY['Active-active clustering for resilience', 'Automated response playbooks'], 70),
  ('Welo FW-820', 'Regional Enterprise', '5,000+ users', 40.00, ARRAY['Advanced IoT/OT asset visibility', 'Granular role-based administration'], 80),
  ('Welo FW-1000', 'Data Center', 'Multi-site data centers', 60.00, ARRAY['Container and east-west traffic policy control', 'Low-latency architecture for critical workloads'], 90),
  ('Welo FW-1400', 'Data Center', 'Mission-critical enterprise core', 90.00, ARRAY['Inline sandboxing and zero-day analysis', '40/100GbE ready hardware acceleration'], 100),
  ('Welo FW-1800', 'Global Enterprise', 'Global multi-region deployments', 120.00, ARRAY['Unified policy orchestration across regions', 'Built-in threat intelligence correlation'], 110),
  ('Welo FW-2200', 'Hyperscale', 'Large-scale service providers', 180.00, ARRAY['Carrier-grade reliability and automation APIs', 'Real-time encrypted traffic analytics'], 120)
ON CONFLICT (model_name) DO UPDATE
SET
  business_size = EXCLUDED.business_size,
  user_range = EXCLUDED.user_range,
  threat_prevention_gbps = EXCLUDED.threat_prevention_gbps,
  overview_points = EXCLUDED.overview_points,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
