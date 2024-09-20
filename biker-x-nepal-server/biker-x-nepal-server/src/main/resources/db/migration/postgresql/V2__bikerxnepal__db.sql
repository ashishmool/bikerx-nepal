-- Inserting into bikes table with bike_id and image names
INSERT INTO bikes (bike_id, make_brand, model, year, description, image)
VALUES
    -- Royal Enfield Bikes
    (1, 'Royal Enfield', 'Classic 350 (346cc)', 2023, 'A timeless classic with modern features.', 'RoyalEnfield_Classic350.jpg'),
    (2, 'Royal Enfield', 'Meteor 350 (349cc)', 2024, 'Comfortable cruiser with smooth performance.', 'RoyalEnfield_Meteor350.jpg'),
    (3, 'Royal Enfield', 'Interceptor 650 (648cc)', 2024, 'Retro-styled motorcycle with twin-cylinder engine.', 'RoyalEnfield_Interceptor650.jpg'),

    -- Honda Bikes
    (4, 'Honda', 'XR150L (149cc)', 2023, 'Durable and reliable dual-sport motorcycle.', 'Honda_XR150L.jpg'),
    (5, 'Honda', 'CRF250L (249cc)', 2024, 'Versatile dual-sport bike suitable for both on and off-road.', 'Honda_CRF250L.jpg'),
    (6, 'Honda', 'Navi (109cc)', 2024, 'Compact and affordable motorcycle for urban commuting.', 'Honda_Navi.jpg'),

    -- Additional Brands and Models
    (7, 'Yamaha', 'FZ-S V3 (149cc)', 2024, 'Sporty design with powerful engine performance.', 'Yamaha_FZ-S_V3.jpg'),
    (8, 'Suzuki', 'Gixxer 250 (248cc)', 2023, 'Street bike with aggressive styling and robust engine.', 'Suzuki_Gixxer250.jpg'),
    (9, 'KTM', 'Duke 200 (199.5cc)', 2024, 'Nimble and lightweight with high-performance capabilities.', 'KTM_Duke200.jpg'),
    (10, 'Bajaj', 'Pulsar 150 (149cc)', 2023, 'Popular choice for its balance of performance and affordability.', 'Bajaj_Pulsar150.jpg');

