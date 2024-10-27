-- Insert Tour 1: Annapurna Circuit Adventure
INSERT INTO tours (
    tour_id,
    tour_name,
    description,
    type,
    itinerary,
    start_date,
    end_date,
    max_participants,
    rating,
    tour_price,
    image
) VALUES (
             999,
             'Namduro Dual-Sports Tour Lamidanda',
             'Experience an exhilarating mix of off-road and on-road adventure in the stunning Lamidanda region. Perfect for thrill-seekers, this tour offers breathtaking views and unforgettable moments.',
             'Dual-Sports',
             'Arrive in Lamidanda, check into accommodations, and attend a welcome briefing. Day 2 begins with an exhilarating off-road exploration in the morning, followed by outdoor activities like hiking or biking in the afternoon. After dinner, participants can share their experiences. On Day 3, enjoy a scenic on-road ride in the morning, followed by final activities and a feedback session before departing Lamidanda.',
             '2024-11-02',
             '2024-11-04',
             8,
             3,
             3000.00,
             'lamidanda-trail.jpg'
         ),


      (
             1001,
             'Annapurna Circuit Adventure',
             'Experience the breathtaking Annapurna Circuit with stunning mountain views.',
             'Off-Road & On-Road',
             'Day 1: Arrival and briefing\nDay 2-14: Trekking through diverse landscapes\nDay 15: Return and departure',
             '2025-05-01',
             '2025-05-15',
             20,
             3.5,
             90000.00,
             'annapurna.jpg'
         ),

(
             1002,
             'Kathmandu Valley Bike Tour',
             'Explore the rich cultural heritage of Kathmandu Valley on two wheels.',
             'On-Road',
             'Day 1: Kathmandu arrival\nDay 2: Pashupatinath and Boudhanath\nDay 3: Bhaktapur and Patan\nDay 4: Return',
             '2025-06-10',
             '2025-06-14',
             15,
             4,
             40000.00,
             'kathmandu_valley.png'
         ),

(
             1003,
             'Everest Base Camp Expedition',
             'Challenge yourself with a bike tour to the Everest Base Camp, experiencing high-altitude biking.',
             'Off-Road & On-Road',
             'Day 1: Kathmandu to Lukla\nDay 2-10: Biking to Base Camp\nDay 11: Return to Kathmandu',
             '2025-02-15',
             '2025-02-25',
             10,
             4.5,
             250000.00,
             'everest_base_camp.jpg'
         ),

(
             1004,
             'Pokhara Lakeside Circuit',
             'Relax and enjoy the serene lakeside views of Pokhara while cycling.',
             'On-Road',
             'Day 1: Arrival in Pokhara\nDay 2-5: Lakeside cycling and sightseeing\nDay 6: Departure',
             '2025-01-05',
             '2025-01-06',
             25,
             2.5,
             95000.00,
             'pokhara_lakeside.jpg'
         ),

(
             1005,
             'Chitwan Jungle Bike Safari',
             'Combine biking with wildlife safari in the Chitwan National Park.',
             'Off-Road & On-Road',
             'Day 1: Arrival in Chitwan\nDay 2-5: Biking through the jungle, wildlife sightings\nDay 6: Return',
             '2025-03-10',
             '2025-03-13',
             18,
             2,
             50900.00,
             'chitwan_jungle.jpg'
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
