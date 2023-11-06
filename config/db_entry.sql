
-- Create USER
INSERT INTO users (email, password, name, phone) VALUES 
('kg@kg.com', '$2a$10$W/vcM0lF0KlgezSqkpJjFusoMt1iZMaowuvMdz1CTiGlXFlTpmi.C', 'Kumar Gaurav', '+919988776655');
INSERT INTO users (email, password, name, phone) VALUES 
('kg1@kg1.com', '$2a$10$W/vcM0lF0KlgezSqkpJjFusoMt1iZMaowuvMdz1CTiGlXFlTpmi.C', 'Kumar Gaurav 1', '+9199887766551');
-- Password is 12345678

-- Create Credits
INSERT INTO credits (user_id, credit_count, credit_type) VALUES 
(1, 10, 'month');
INSERT INTO credits (user_id, credit_count, credit_type) VALUES 
(2, 10, 'month');

-- Create Clients
INSERT INTO clients (user_id, name, email, phone, address) VALUES 
(1, 'Garima Prakash', 'gps@gps.com', '+91987654321', 'Gol market, Delhi-110001');
INSERT INTO clients (user_id, name, email, phone, address) VALUES 
(2, 'Yash Prakash', 'yash@gps.com', '+91987654321', 'Gol market, Delhi-110001');

-- Create Project
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(1, 1, 'Prj 1', 'This is the first project', 'Pitched');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(2, 2, 'Prj 2', 'This is the second project', 'In-Progress');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(2, 2, 'Prj 3', 'This is the third project', 'Completed');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(1, 1, 'Prj 4', 'This is the forth project', 'Completed');