'use strict';

INSERT INTO exotic_spotter_content (user_id, make, model, location)
VALUES
(1, 'McLaren', 'Senna', 'Portland,Or'),
(2, 'Lamborghini', 'huracan performante', 'Seattle,Wa'),
(3, 'Nissan', 'GT-R', 'Vancouver,Wa'),
(3, 'Lotus', 'Exige', 'Vancouver,Wa');

INSERT INTO exotic_spotter_users (user_name, full_name, password)
VALUES
('car_guy', 'Sam Smith', 'sam-password'),
('car_gal', 'Alex Taylor', 'alex-password'),
('SuperSpeed72', 'Rob Pepper','rob-password');
