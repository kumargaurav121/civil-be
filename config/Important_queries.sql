SELECT * FROM civil.users;

SELECT * FROM civil.credits;

SELECT * FROM civil.projects;

SELECT * FROM civil.clients;

SELECT * FROM civil.clients limit 1, 3;
DELETE FROM civil.clients WHERE id=10;
DELETE FROM civil.projects WHERE id=2;

INSERT INTO clients (user_id, name, email, phone, address) VALUES 
(1, 'Amar Singh', 'amar@amar.com', '+913456543234', 'Noida, Delhi-110001');

SELECT 
u.name as user_name, 
p.name as project_name, 
cl.name as client_name, 
cl.address as client_address, 
"type" as type, 
5000 as price, 
p.status as status 
from users u
join clients cl on u.id = cl.user_id
join credits cr on u.id = cr.user_id
join projects p on cl.id = p.client_id
where u.id = 1;




