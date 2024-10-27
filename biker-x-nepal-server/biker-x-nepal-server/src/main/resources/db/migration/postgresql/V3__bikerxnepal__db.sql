INSERT INTO tours (
    tour_id,
    tour_name,
    description,
    map,
    type,
    itinerary,
    start_date,
    end_date,
    max_participants,
    rating,
    comfort_rating,
    tour_price,
    image
) VALUES (
             9999,
             'Namduro Dual-Sports Tour Lamidanda',
             'Embark on an exhilarating journey through the breathtaking Lamidanda region, where stunning landscapes meet the thrill of adventure. This tour is designed for thrill-seekers and nature enthusiasts alike, offering a perfect blend of off-road excitement and scenic on-road exploration.

As you traverse the rugged terrain, prepare to be captivated by panoramic views of lush hills, serene valleys, and vibrant local culture. Each turn reveals a new aspect of this hidden gem, making every moment truly unforgettable. Whether you''re navigating through challenging trails or cruising along picturesque roads, the Lamidanda region promises an adrenaline-fueled experience that will leave you with lasting memories.

Join us for this unique adventure and immerse yourself in the natural beauty and adventure that Lamidanda has to offer!',
             'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111474.00218416998!2d86.56653853682818!3d27.241314725155924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e93148613feefd%3A0xc5f51f8d453423dc!2z4KSy4KS-4KSu4KWA4KSh4KS-4KSB4KSh4KS-!5e1!3m2!1sne!2snp!4v1730050682427!5m2!1sne!2snp',
             'Dual-Sports',
             'Arrive in Lamidanda, check into accommodations, and attend a welcome briefing. Day 2 begins with an exhilarating off-road exploration in the morning, followed by outdoor activities like hiking or biking in the afternoon. After dinner, participants can share their experiences. On Day 3, enjoy a scenic on-road ride in the morning, followed by final activities and a feedback session before departing Lamidanda.',
             '2024-11-02',
             '2024-11-04',
             8,
             3,
             2.5,
             3000.00,
             'lamidanda-trail.jpg'
         ),


      (
             10001,
             'Annapurna Circuit Adventure',
             'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d264263.98351803643!2d83.58467958952325!3d28.47123801711487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995f69b98264d51%3A0x48fd51cb6932d80b!2z4KSY4KS-4KSo4KWN4KSm4KWN4KSw4KWB4KSVIDMzNzAw!5e1!3m2!1sne!2snp!4v1730050834050!5m2!1sne!2snp',
             'Experience the breathtaking Annapurna Circuit with stunning mountain views.',
             'Off-Road & On-Road',
             'Day 1: Arrival and briefing\nDay 2-14: Trekking through diverse landscapes\nDay 15: Return and departure',
             '2025-05-01',
             '2025-05-10',
             6,
             3.5,
             4,
             79699.89,
             'annapurna.jpg'
         );


-- -- Insert Itinerary for Tour 1: Annapurna Circuit Adventure
-- INSERT INTO itineraries (
--     itinerary_id,
--     tour_id,
--     no_of_days,
--     description
-- ) VALUES (
--              2001, -- Assuming a separate sequence for itinerary_id starting at 2001
--              1001,
--              15,
--              'A comprehensive trekking experience through the Annapurna region, covering diverse terrains and cultures.'
--          );
--
-- -- Insert Itinerary for Tour 2: Kathmandu Valley Bike Tour
-- INSERT INTO itineraries (
--     itinerary_id,
--     tour_id,
--     no_of_days,
--     description
-- ) VALUES (
--              2002,
--              1002,
--              4,
--              'A cultural exploration of Kathmandu Valley, visiting key historical and religious sites by bike.'
--          );
--
-- -- Insert Itinerary for Tour 3: Everest Base Camp Expedition
-- INSERT INTO itineraries (
--     itinerary_id,
--     tour_id,
--     no_of_days,
--     description
-- ) VALUES (
--              2003,
--              1003,
--              11,
--              'An extreme biking expedition to Everest Base Camp, including acclimatization days and high-altitude riding.'
--          );
--
-- -- Insert Itinerary for Tour 4: Pokhara Lakeside Cycling
-- INSERT INTO itineraries (
--     itinerary_id,
--     tour_id,
--     no_of_days,
--     description
-- ) VALUES (
--              2004,
--              1004,
--              6,
--              'Leisurely cycling around Pokhara Lakeside with opportunities for sightseeing and relaxation.'
--          );
--
-- -- Insert Itinerary for Tour 5: Chitwan Jungle Bike Safari
-- INSERT INTO itineraries (
--     itinerary_id,
--     tour_id,
--     no_of_days,
--     description
-- ) VALUES (
--              2005,
--              1005,
--              6,
--              'A unique combination of biking and wildlife safari in Chitwan National Park, including guided tours.'
--          );
