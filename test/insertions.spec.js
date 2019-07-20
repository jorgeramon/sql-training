const { expect } = require('chai');
const { query, queryByFile } = require('./db');

const DATABASE_NAME = 'bedu_music';

describe('Insertions Test', () => {

  before(async () => {
    await query(`DROP DATABASE IF EXISTS ${ DATABASE_NAME }`);
    await queryByFile('data_definition_language.sql');
    await queryByFile('insertions.sql');
  });

  it('should have inserted 12 genres', async () => {
    const result = await query('SELECT LOWER(name) as name FROM genre');
    const genres = result.map(x => x.name);

    expect(genres).to.have.lengthOf(12);

    [
      'progressive rock', 'hard rock', 'progressive pop', 'power pop', 'pop rock',
      'viking metal', 'psychedelic rock', 'heavy metal', 'thrash metal', 'grunge',
      'alternative rock', 'proto-punk'
    ].forEach(genre => expect(genres).to.include(genre));
  });

  it('should have inserted 4 artists', async () => {
    const result = await query('SELECT LOWER(name) as name FROM artist');
    const artists = result.map(x => x.name);

    expect(artists).to.have.lengthOf(4);

    [
      'the doors', 'queen',
      'nirvana', 'led zeppelin'
    ].forEach(artist => expect(artists).to.include(artist));
  });

  it('should have inserted 8 albums', async () => {
    const result = await query('SELECT LOWER(title) as title FROM album');
    const albums = result.map(x => x.title);

    expect(albums).to.have.lengthOf(8);

    [
      'a night at the opera', 'strange days', 'nevermind', 'in utero',
      'the doors', 'led zeppelin iii', 'jazz', 'sheer heart attack'
    ].forEach(album => expect(albums).to.include(album));
  });

  it('should have inserted 12 songs', async () => {
    const result = await query('SELECT LOWER(title) as title FROM song');
    const songs = result.map(x => x.title);

    expect(songs).to.have.lengthOf(12);

    [
      'smells like teen spirit', 'breed', 'heart-shaped box', 'rape me',
      'light my fire', 'break on through (to the other side)',
      'people are strange', 'strange days', 'immigrant song', 'don\'t stop me now',
      'stone cold crazy', 'bohemian rhapsody'
    ].forEach(song => expect(songs).to.include(song));
  });

  it('should have each song with its artists', async () => {
    const songs = [
      {
        song: 'smells like teen spirit',
        artists: ['nirvana'],
      },
      {
        song: 'breed',
        artists: ['nirvana'],
      },
      {
        song: 'heart-shaped box',
        artists: ['nirvana'],
      },
      {
        song: 'rape me',
        artists: ['nirvana'],
      },
      {
        song: 'light my fire',
        artists: ['the doors'],
      },
      {
        song: 'break on through (to the other side)',
        artists: ['the doors'],
      },
      {
        song: 'people are strange',
        artists: ['the doors'],
      },
      {
        song: 'strange days',
        artists: ['the doors'],
      },
      {
        song: 'immigrant song',
        artists: ['led zeppelin'],
      },
      {
        song: 'don\'t stop me now',
        artists: ['queen'],
      },
      {
        song: 'stone cold crazy',
        artists: ['queen'],
      },
      {
        song: 'bohemian rhapsody',
        artists: ['queen'],
      }
    ];

    for (let entry of songs) {

      const result = await query(`
        SELECT LOWER(a.name) as name
        FROM artist a
          JOIN song_artist sa ON a.id = sa.id_artist
          JOIN song s ON s.id = sa.id_song
        WHERE
          s.title = "${ entry.song }";
        `);

      const artists = result.map(x => x.name);

      expect(artists).to.have.lengthOf(entry.artists.length);
      entry.artists.forEach(x => expect(artists).to.include(x));
    }
  });

  it('should have each song with its albums', async () => {
    const songs = [
      {
        song: 'smells like teen spirit',
        albums: ['nevermind'],
      },
      {
        song: 'breed',
        albums: ['nevermind'],
      },
      {
        song: 'heart-shaped box',
        albums: ['in utero'],
      },
      {
        song: 'rape me',
        albums: ['in utero'],
      },
      {
        song: 'light my fire',
        albums: ['the doors'],
      },
      {
        song: 'break on through (to the other side)',
        albums: ['the doors'],
      },
      {
        song: 'people are strange',
        albums: ['strange days'],
      },
      {
        song: 'strange days',
        albums: ['strange days'],
      },
      {
        song: 'immigrant song',
        albums: ['led zeppelin iii'],
      },
      {
        song: 'don\'t stop me now',
        albums: ['jazz'],
      },
      {
        song: 'stone cold crazy',
        albums: ['sheer heart attack'],
      },
      {
        song: 'bohemian rhapsody',
        albums: ['a night at the opera'],
      }
    ];

    for (let entry of songs) {

      const result = await query(`
        SELECT LOWER(a.title) as name
        FROM album a
          JOIN song_album sa ON a.id = sa.id_album
          JOIN song s ON s.id = sa.id_song
        WHERE
          s.title = "${ entry.song }";
        `);

      const albums = result.map(x => x.name);

      expect(albums).to.have.lengthOf(entry.albums.length);
      entry.albums.forEach(x => expect(albums).to.include(x));
    }
  });

  it('should have each song with its genres', async () => {
    const songs = [
      {
        song: 'smells like teen spirit',
        genres: ['grunge']
      },
      {
        song: 'breed',
        genres: ['grunge']
      },
      {
        song: 'heart-shaped box',
        genres: ['grunge']
      },
      {
        song: 'rape me',
        genres: ['grunge']
      },
      {
        song: 'light my fire',
        genres: ['psychedelic rock']
      },
      {
        song: 'break on through (to the other side)',
        genres: ['psychedelic rock', 'proto-punk']
      },
      {
        song: 'people are strange',
        genres: ['psychedelic rock']
      },
      {
        song: 'strange days',
        genres: ['psychedelic rock']
      },
      {
        song: 'immigrant song',
        genres: ['hard rock', 'viking metal']
      },
      {
        song: 'don\'t stop me now',
        genres: ['power pop', 'pop rock']
      },
      {
        song: 'stone cold crazy',
        genres: ['heavy metal', 'hard rock', 'thrash metal']
      },
      {
        song: 'bohemian rhapsody',
        genres: ['progressive rock', 'hard rock', 'progressive pop']
      }
    ];

    for (let entry of songs) {

      const result = await query(`
        SELECT LOWER(a.name) as name
        FROM genre a
          JOIN song_genre sg ON a.id = sg.id_genre
          JOIN song s ON s.id = sg.id_song
        WHERE
          s.title = "${ entry.song }";
        `);

      const genres = result.map(x => x.name);

      expect(genres).to.have.lengthOf(entry.genres.length);
      entry.genres.forEach(x => expect(genres).to.include(x));
    }
  });

  it('should have each artist with his albums', async () => {
    const artists = [
      {
        artist: 'queen',
        albums: ['a night at the opera', 'sheer heart attack', 'jazz']
      },
      {
        artist: 'nirvana',
        albums: ['nevermind', 'in utero']
      },
      {
        artist: 'the doors',
        albums: ['the doors', 'strange days']
      },
      {
        artist: 'led zeppelin',
        albums: ['led zeppelin iii']
      }
    ];

    for (let entry of artists) {

      const result = await query(`
        SELECT LOWER(a.title) as name
        FROM album a
          JOIN artist_album aa ON a.id = aa.id_album
          JOIN artist a2 ON a2.id = aa.id_artist
        WHERE
          a2.name = "${ entry.artist }";
        `);

      const albums = result.map(x => x.name);

      expect(albums).to.have.lengthOf(entry.albums.length);
      entry.albums.forEach(x => expect(albums).to.include(x));
    }
  });
  after(async () => {
    await query(`DROP DATABASE IF EXISTS ${ DATABASE_NAME }`);
  });
});
