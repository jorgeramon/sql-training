/*

Insertar la siguiente información:

Smells Like Teen Spirit by Nirvana, 1991
Nevermind, 1991
Grunge

Breed by Nirvana, 1991
Nevermind, 1991
Grunge, Alternative Rock

Heart-Shaped Box by Nirvana, 1993
In Utero, 1993
Grunge

Rape Me by Nirvana, 1993
In Utero, 1993
Grunge

Light My Fire by The Doors, 1967
The Doors, 1967
Psychedelic Rock

Break On Through (To the Other Side) by The Doors, 1967
The Doors, 1967
Psychedelic Rock, Proto-Punk

People Are Strange by The Doors, 1967
Strange Days, 1967
Psychedelic Rock

Strange Days by The Doors, 1967
Strange Days, 1967
Psychedelic Rock

Immigrant Song by Led Zeppelin, 1970
Led Zeppelin III, 1970
Hard Rock, Viking Metal

Don't Stop Me Now by Queen, 1979
Jazz, 1978
Power Pop, Pop Rock

Stone Cold Crazy by Queen, 1974
Sheer Heart Attack, 1974
Heavy Metal, Hard Rock, Thrash Metal

Bohemian Rhapsody by Queen, 1975
A Night at the Opera, 1975
Progressive Rock, Hard Rock, Progressive Pop

*/

INSERT INTO genre VALUES (1, 'Progressive Rock'), (2, 'Hard Rock'), (3, 'Progressive Pop'),
(4, 'Power Pop'), (5, 'Pop Rock'), (6, 'Viking Metal'), (7, 'Psychedelic Rock'),
(8, 'Heavy Metal'), (9, 'Thrash Metal'), (10, 'Grunge'), (11, 'Alternative Rock'), (12, 'Proto-Punk');

INSERT INTO artist VALUES (1, 'Queen'), (2, 'Led Zeppelin'), (3, 'The Doors'),
(4, 'Nirvana');

INSERT INTO album VALUES (1, 'A Night at the Opera', 1975), (2, 'Jazz', 1978), (3, 'Sheer Heart Attack', 1974), (4, 'Led Zeppelin III', 1970), (5, 'Strange Days', 1967), (6, 'The Doors', 1967), (7, 'In Utero', 1993), (8, 'Nevermind', 1991);

INSERT INTO song VALUES (1, 'Bohemian Rhapsody', 1975), (2, 'Stone Cold Crazy', 1974), (3, 'Don\'t Stop Me Now', 1979), (4, 'Immigrant Song', 1970), (5, 'Strange Days', 1967), (6, 'People Are Strange', 1967), (7, 'Break On Through (To the Other Side)', 1967), (8, 'Light My Fire', 1967), (9, 'Rape Me', 1993), (10, 'Heart-Shaped Box', 1993), (11, 'Breed', 1991), (12, 'Smells Like Teen Spirit', 1991);

INSERT INTO song_genre(id_song, id_genre)  VALUES (12, 10), (11, 10), (10, 10), (9, 10), (8, 7), (7, 7), (7, 12), (6, 7), (5, 7),
(4, 6), (4, 2), (3, 4), (3, 5), (2, 2), (2, 8), (2, 9), (1, 1), (1, 3), (1, 2);

INSERT INTO song_artist(id_song, id_artist) VALUES (1, 1), (2, 1), (3, 1), (4, 2), (5, 3), (6, 3), (7, 3), (8, 3), (9, 4), (10, 4), (11, 4), (12, 4);

INSERT INTO song_album(id_song, id_album) VALUES (1, 1), (2, 3), (3, 2), (4, 4), (5, 5), (6, 5), (7, 6), (8, 6), (9, 7), (10, 7), (11, 8), (12, 8);

INSERT INTO artist_album(id_artist, id_album) VALUES (1, 1), (1, 2), (1, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8);
