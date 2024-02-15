
-- Inserting a system_user with Admin role
INSERT INTO system_users (user_id, first_name, last_name, role, email, password)
VALUES (0,'Ashish', 'Mool', 'Admin', 'bikerxnepal@gmail.com', '$2a$12$8QnQpAeSERbdP8/epfWtJOyhwcysnyHEPItkv1mbVbbqkRJOSBbZ.');


-- Inserting a role for Admin
INSERT INTO roles (id, name) VALUES (1, 'Admin');
INSERT INTO roles (id, name) VALUES (2, 'Customer');

-- Mapping role for UserId as RoleId for Admin
INSERT INTO users_roles (user_id, role_id) VALUES (0, 1);


-- Inserting Email Credentials
INSERT INTO public.email_credentials (id, email, password, host, port, date, active, protocol)
VALUES (1,'bikerxnepal@gmail.com', 'hqkj pldf mesx syvg', 'smtp.gmail.com', '587','2024-01-19 16:04:32.000000', true, 'smtp');


