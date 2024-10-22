-- Inserting into bikes table with bike_id and image names
INSERT INTO bikes (bike_id, make_brand, model, year, bike_price, description, image, quantity_stock, owner_email, terrain)
VALUES
    (9001, 'Honda', 'Navi (109cc)', 2024, 6000.00,'Compact and affordable motorcycle for urban commuting.', 'honda-navi.png',2,'test@gmail.com','All-Terrain'),

    -- Additional Brands and Models
    (9002, 'Yamaha', 'MT-15 (149cc)', 2024, 7000.00, 'Sporty design with powerful engine performance.', 'yamaha-mt15.png',3,'test@gmail.com','On-Road'),
    (9003, 'Suzuki', 'Gixxer 250 (248cc)', 2023, 8000.00, 'Street bike with aggressive styling and robust engine.', 'gixxer-250.png', 1,'test@gmail.com','All-Terrain'),
    (9004, 'KTM', 'Duke 200 (199.5cc)', 2024, 9000.00, 'Nimble and lightweight with high-performance capabilities.', 'duke-200.png',4,'test@gmail.com','On-Road');