SELECT * FROM civil.users;

SELECT * FROM civil.credits;

SELECT * FROM civil.projects;

SELECT * FROM civil.clients;

SELECT * from civil.rooms;

SELECT * FROM calculations;

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

SELECT 
c.id as client_id,
c.name as client_name,
c.email as client_email,
c.address as client_address,
c.phone as client_phone,
p.id as project_id,
p.name as project_name,
p.status as project_status,
p.description as project_description,
r.id as room_id,
r.name as rooms_name,
r.length as room_length,
r.width as room_width,
r.height as room_height,
r.price as room_price,
r.discount as room_discount,
r.updated_at as last_update
from projects p
join clients c on c.id = p.client_id
left join rooms r on p.id = r.project_id
where p.id = 5;


SELECT 
cal.id as id,
cal.category_id as category_id,
cal.sub_category_id as sub_category_id,
c.name as category,
s.name as sub_category,
cal.wastage as wastage,
cal.counts as counts,
cal.cost_per_unit as cost_per_unit,
cal.price as price
FROM calculations cal
left join category c on cal.category_id = c.id
left join sub_category s on cal.sub_category_id = s.id
WHERE cal.room_id = 1;




