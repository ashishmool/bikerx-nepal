-- Update image file names to .png for all bikes
UPDATE bikes
SET image = REPLACE(image, '.jpg', '.png')
WHERE image LIKE '%.jpg';
