
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
INSERT INTO clients (user_id, name, email, phone, address) VALUES 
(1, 'Amar Singh', 'amar@amar.com', '+913456543234', 'Noida, Delhi-110001');

-- Create Project
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(1, 1, 'Prj 1', 'This is the first project', 'Pitched');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(2, 2, 'Prj 2', 'This is the second project', 'In-Progress');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(2, 2, 'Prj 3', 'This is the third project', 'Completed');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(1, 1, 'Prj 4', 'This is the forth project', 'Completed');
INSERT INTO projects (user_id, client_id, name, description, status) VALUES 
(1, 3, 'Prj 5', 'This is the fifth project', 'Completed');


-- Create Rooms
INSERT INTO rooms (user_id, project_id, name, length, width, height, price, discount) VALUES 
(1, 1, "Kitchen", 11, 12, 15, 0, 0);
INSERT INTO rooms (user_id, project_id, name, length, width, height, price, discount) VALUES 
(1, 1, "Bedroom", 3400, 3400, 3400, 0, 0);

-- Create Category
INSERT INTO category (name) VALUES ("Dismantling");
INSERT INTO category (name) VALUES ("Tiling");
INSERT INTO category (name) VALUES ("Electrical");

-- Create Sub-Category
INSERT INTO sub_category (category_id, name, unit) VALUES (1, "Existing Floor/Wall Tiles", "Sqft");
INSERT INTO sub_category (category_id, name, unit) VALUES (1, "Kitchen Counter Top/Wall And Base Cabinets", "Sqft");
INSERT INTO sub_category (category_id, name, unit) VALUES (2, "Floor Tiling", "Sqft");
INSERT INTO sub_category (category_id, name, unit) VALUES (2, "Skirting", "R. ft");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "6 Amp Point", "No.s");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "16 Amp Point", "No.s");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "Full Home Electrical", "Sqft");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "Light Installation", "No.s");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "Fan Installation", "No.s");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "AC Installation", "No.s");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "Exhaust Installation", "No.s");
INSERT INTO sub_category (category_id, name, unit) VALUES (3, "Geyser Installation", "No.s");


-- Create Calculations
INSERT INTO calculations (user_id, project_id, room_id, category_id, sub_category_id, wastage, counts, cost_per_unit, price) VALUES 
(1, 1, 1, 2, 3, 10, 1, 120, 17424);
INSERT INTO calculations (user_id, project_id, room_id, category_id, sub_category_id, wastage, counts, cost_per_unit, price) VALUES 
(1, 1, 1, 3, 7, 10, 1500, 180, 297000);
UPDATE rooms SET price = 314424 WHERE id = 1;





