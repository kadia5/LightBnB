INSERT INTO users ( id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL)
VALUES (1, 'lucia', 'lucia@gmail.com', $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u),
(2, 'sacha', 'sacha@gmail.com', $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u ),
(3, 'shaka', 'shaka@gmail.com', $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u);

INSERT INTO properties ( 
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255) NOT NULL,
  cost_per_night INTEGER  NOT NULL DEFAULT 0,
  parking_spaces INTEGER  NOT NULL DEFAULT 0,
  number_of_bathrooms INTEGER  NOT NULL DEFAULT 0,
  number_of_bedrooms INTEGER  NOT NULL DEFAULT 0,

  country VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL,

  active BOOLEAN NOT NULL DEFAULT TRUE)
VALUES (1, 1, 'Oaks Valley', 'description', 'https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558','https://cdn.shopify.com/s/files/1/0326/7189/t/65/assets/pf-e820b2e0--mother-tree-forest_500x.jpg?v=1619557558', 200, 50, 60, 50, 'Canada', 'Aurora Pl', 'Toronto', 'ON', 'L6A2R1', TRUE),
(2, 2, 'Sakura Inn', 'description','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.asca-consultants.org%2Fnews%2F493307%2FIts-Cherry-Blossom-Season-Celebrate-Springs-Iconic-Pink-Blooms-With-These-35-Fun-Facts-.htm&psig=AOvVaw0Y4RLtOY0tfjVbHdSCsAYu&ust=1631904377833000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMj2w9iThPMCFQAAAAAdAAAAABAK', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.asca-consultants.org%2Fnews%2F493307%2FIts-Cherry-Blossom-Season-Celebrate-Springs-Iconic-Pink-Blooms-With-These-35-Fun-Facts-.htm&psig=AOvVaw0Y4RLtOY0tfjVbHdSCsAYu&ust=1631904377833000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMj2w9iThPMCFQAAAAAdAAAAABAK', 500, 50, 60, 50, 'Japan', 'Shinjuku', 'Tokyo', 'Kabukicho', 'L7B2R1', TRUE),
(3, 3, 'Lions Gate', 'description','https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLion&psig=AOvVaw0akxlV5VR0yDyJVMDUZyxJ&ust=1631904444779000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOih3fiThPMCFQAAAAAdAAAAABAD', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLion&psig=AOvVaw0akxlV5VR0yDyJVMDUZyxJ&ust=1631904444779000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOih3fiThPMCFQAAAAAdAAAAABAD', 500, 50, 60, 50,'Cape Town', 'Roarin Plaza', 'Flyeng', 'SA', 'L8C2R1', TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0,
  message TEXT)
VALUES (1, 1, 1, 1, 5,'excellent'),
(2, 2, 2, 2, 5,'eggsalent'),
(3, 3, 3, 3, 5,'eggsalad');