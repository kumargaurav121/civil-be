
-- Create USRE
INSERT INTO users (email, password, name, phone) VALUES 
('kg@kg.com', '$2a$10$W/vcM0lF0KlgezSqkpJjFusoMt1iZMaowuvMdz1CTiGlXFlTpmi.C', 'Kumar Gaurav', '+919988776655');
-- Password is 12345678

-- Create Credits
INSERT INTO credits (user_id, credit_count, credit_type) VALUES 
(1, 10, 'month');