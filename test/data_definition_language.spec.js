const { expect } = require('chai');
const { query, queryByFile } = require('./db');
const {
  validateFields,
  validateTableExists,
  validateDatabaseExists
} = require('./validator');

const DATABASE_NAME = 'bedu_music';

const ARTIST_TABLE = 'artist';
const ALBUM_TABLE = 'album';
const ARTIST_ALBUM_TABLE = 'artist_album';
const SONG_ARTIST_TABLE = 'song_artist';
const SONG_TABLE = 'song';
const SONG_ALBUM_TABLE = 'song_album';
const GENRE_TABLE = 'genre';
const SONG_GENRE_TABLE = 'song_genre';
const PLAYLIST_TABLE = 'playlist';
const PLAYLIST_SONG_TABLE = 'playlist_song';
const USER_TABLE = 'user';
const USER_SONG_TABLE = 'user_song';
const CREDIT_CARD_TABLE = 'credit_card';
const PAYMENT_TABLE = 'payment';

const BIGINT_TYPE = 'bigint';
const VARCHAR_TYPE = 'varchar';
const CHAR_TYPE = 'char';
const DATE_TYPE = 'date';
const DATE_TIME_TYPE = 'datetime';
const BOOLEAN_TYPE = 'tinyint';
const DECIMAL_TYPE = 'decimal';
const SMALL_INT_TYPE = 'smallint';

describe('Data Definition Test', () => {

  before(async () => {
    await query(`DROP DATABASE IF EXISTS ${ DATABASE_NAME }`);
    await queryByFile('data_definition_language.sql');
  });

  describe(`Create "${ DATABASE_NAME }" database`, () => {

    it('should exist', async () => {
      await validateDatabaseExists(DATABASE_NAME);
    });

    after(async () => {
      await query(`use ${ DATABASE_NAME }`);
    });
  });

  describe(`Create "${ ARTIST_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, ARTIST_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(ARTIST_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'name',
          type: VARCHAR_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(ARTIST_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'name',
          isPrimaryKey: false
        }
      ]);
    });

    it('should\'nt have foreign keys', async () => {
      await validateFields(ARTIST_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'name',
          isForeignKey: false
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(ARTIST_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'name',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ ALBUM_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, ALBUM_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(ALBUM_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'title',
          type: VARCHAR_TYPE
        },
        {
          name: 'release_year',
          type: SMALL_INT_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(ALBUM_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'title',
          isPrimaryKey: false
        },
        {
          name: 'release_year',
          isPrimaryKey: false
        }
      ]);
    });

    it('should\'nt have foreign keys', async () => {
      await validateFields(ALBUM_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'title',
          isForeignKey: false
        },
        {
          name: 'release_year',
          isForeignKey: false
        }
      ]);
    });

    it('should have release_year as nullable field', async () => {
      await validateFields(ALBUM_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'title',
          isNullable: false
        },
        {
          name: 'release_year',
          isNullable: true
        }
      ]);
    });
  });

  describe(`Create "${ ARTIST_ALBUM_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, ARTIST_ALBUM_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(ARTIST_ALBUM_TABLE, [
        {
          name: 'id_artist',
          type: BIGINT_TYPE
        },
        {
          name: 'id_album',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id_artist, id_album fields as primary key', async () => {
      await validateFields(ARTIST_ALBUM_TABLE, [
        {
          name: 'id_artist',
          isPrimaryKey: true
        },
        {
          name: 'id_album',
          isPrimaryKey: true
        }
      ]);
    });

    it('should have id_artist, id_album fields as foreign keys', async () => {
      await validateFields(ARTIST_ALBUM_TABLE, [
        {
          name: 'id_artist',
          isForeignKey: true,
          references: ARTIST_TABLE
        },
        {
          name: 'id_album',
          isForeignKey: true,
          references: ALBUM_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(ARTIST_ALBUM_TABLE, [
        {
          name: 'id_artist',
          isNullable: false
        },
        {
          name: 'id_album',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ SONG_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, SONG_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(SONG_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'title',
          type: VARCHAR_TYPE
        },
        {
          name: 'release_year',
          type: SMALL_INT_TYPE
        }
      ]);
    });

    it('should have id as primary key', async () => {
      await validateFields(SONG_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'title',
          isPrimaryKey: false
        },
        {
          name: 'release_year',
          isPrimaryKey: false
        }
      ]);
    });

    it('should\'nt have foreign keys', async () => {
      await validateFields(SONG_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'title',
          isForeignKey: false
        },
        {
          name: 'release_year',
          isForeignKey: false
        }
      ]);
    });

    it('should have release_year as nullable field', async () => {
      await validateFields(SONG_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'title',
          isNullable: false
        },
        {
          name: 'release_year',
          isNullable: true
        }
      ]);
    });
  });

  describe(`Create "${ SONG_ARTIST_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, SONG_ARTIST_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(SONG_ARTIST_TABLE, [
        {
          name: 'id_song',
          type: BIGINT_TYPE
        },
        {
          name: 'id_artist',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id_song, id_artist as primary key', async () => {
      await validateFields(SONG_ARTIST_TABLE, [
        {
          name: 'id_song',
          isPrimaryKey: true
        },
        {
          name: 'id_artist',
          isPrimaryKey: true
        }
      ]);
    });

    it('should have id_song, id_artist as foreign keys', async () => {
      await validateFields(SONG_ARTIST_TABLE, [
        {
          name: 'id_song',
          isForeignKey: true,
          references: SONG_TABLE
        },
        {
          name: 'id_artist',
          isForeignKey: true,
          references: ARTIST_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(SONG_ARTIST_TABLE, [
        {
          name: 'id_song',
          isNullable: false
        },
        {
          name: 'id_artist',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ SONG_ALBUM_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, SONG_ALBUM_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(SONG_ALBUM_TABLE, [
        {
          name: 'id_song',
          type: BIGINT_TYPE
        },
        {
          name: 'id_album',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id_song, id_album as primary key', async () => {
      await validateFields(SONG_ALBUM_TABLE, [
        {
          name: 'id_song',
          isPrimaryKey: true
        },
        {
          name: 'id_album',
          isPrimaryKey: true
        }
      ]);
    });

    it('should have id_song, id_album as foreign keys', async () => {
      await validateFields(SONG_ALBUM_TABLE, [
        {
          name: 'id_song',
          isForeignKey: true,
          references: SONG_TABLE
        },
        {
          name: 'id_album',
          isForeignKey: true,
          references: ALBUM_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(SONG_ALBUM_TABLE, [
        {
          name: 'id_song',
          isNullable: false
        },
        {
          name: 'id_album',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ GENRE_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, GENRE_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(GENRE_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'name',
          type: VARCHAR_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(GENRE_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'name',
          isPrimaryKey: false
        }
      ]);
    });

    it('should\'nt have foreign keys', async () => {
      await validateFields(GENRE_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'name',
          isForeignKey: false
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(GENRE_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'name',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ USER_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, USER_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(USER_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'name',
          type: VARCHAR_TYPE
        },
        {
          name: 'username',
          type: VARCHAR_TYPE
        },
        {
          name: 'email',
          type: VARCHAR_TYPE
        },
        {
          name: 'is_premium',
          type: BOOLEAN_TYPE
        },
        {
          name: 'password',
          type: VARCHAR_TYPE
        },
        {
          name: 'created_date',
          type: DATE_TIME_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(USER_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'name',
          isPrimaryKey: false
        },
        {
          name: 'username',
          isPrimaryKey: false
        },
        {
          name: 'email',
          isPrimaryKey: false
        },
        {
          name: 'is_premium',
          isPrimaryKey: false
        },
        {
          name: 'password',
          isPrimaryKey: false
        },
        {
          name: 'created_date',
          isPrimaryKey: false
        }
      ]);
    });

    it('should\'nt have foreign keys', async () => {
      await validateFields(USER_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'name',
          isForeignKey: false
        },
        {
          name: 'username',
          isForeignKey: false
        },
        {
          name: 'email',
          isForeignKey: false
        },
        {
          name: 'is_premium',
          isForeignKey: false
        },
        {
          name: 'password',
          isForeignKey: false
        },
        {
          name: 'created_date',
          isForeignKey: false
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(USER_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'name',
          isNullable: false
        },
        {
          name: 'username',
          isNullable: false
        },
        {
          name: 'email',
          isNullable: false
        },
        {
          name: 'is_premium',
          isNullable: false
        },
        {
          name: 'password',
          isNullable: false
        },
        {
          name: 'created_date',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ PLAYLIST_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, PLAYLIST_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(PLAYLIST_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'name',
          type: VARCHAR_TYPE
        },
        {
          name: 'id_user',
          type: BIGINT_TYPE
        },
        {
          name: 'created_date',
          type: DATE_TIME_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(PLAYLIST_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'name',
          isPrimaryKey: false
        },
        {
          name: 'id_user',
          isPrimaryKey: false
        },
        {
          name: 'created_date',
          isPrimaryKey: false
        }
      ]);
    });

    it('should have id_user as foreign key', async () => {
      await validateFields(PLAYLIST_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'name',
          isForeignKey: false
        },
        {
          name: 'id_user',
          isForeignKey: true,
          references: USER_TABLE
        },
        {
          name: 'created_date',
          isForeignKey: false
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(PLAYLIST_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'name',
          isNullable: false
        },
        {
          name: 'id_user',
          isNullable: false
        },
        {
          name: 'created_date',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ CREDIT_CARD_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, CREDIT_CARD_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(CREDIT_CARD_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'number',
          type: CHAR_TYPE
        },
        {
          name: 'id_user',
          type: BIGINT_TYPE
        },
        {
          name: 'expiration_date',
          type: DATE_TYPE
        },
        {
          name: 'cvv',
          type: CHAR_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(CREDIT_CARD_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'number',
          isPrimaryKey: false
        },
        {
          name: 'id_user',
          isPrimaryKey: false
        },
        {
          name: 'expiration_date',
          isPrimaryKey: false
        },
        {
          name: 'cvv',
          isPrimaryKey: false
        }
      ]);
    });

    it('should have id_user as foreign key', async () => {
      await validateFields(CREDIT_CARD_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'number',
          isForeignKey: false
        },
        {
          name: 'id_user',
          isForeignKey: true,
          references: USER_TABLE
        },
        {
          name: 'expiration_date',
          isForeignKey: false
        },
        {
          name: 'cvv',
          isForeignKey: false
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(CREDIT_CARD_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'number',
          isNullable: false
        },
        {
          name: 'id_user',
          isNullable: false
        },
        {
          name: 'expiration_date',
          isNullable: false
        },
        {
          name: 'cvv',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ PAYMENT_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, PAYMENT_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(PAYMENT_TABLE, [
        {
          name: 'id',
          type: BIGINT_TYPE
        },
        {
          name: 'amount',
          type: DECIMAL_TYPE
        },
        {
          name: 'id_user',
          type: BIGINT_TYPE
        },
        {
          name: 'payment_date',
          type: DATE_TIME_TYPE
        },
        {
          name: 'id_credit_card',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id field as primary key', async () => {
      await validateFields(PAYMENT_TABLE, [
        {
          name: 'id',
          isPrimaryKey: true
        },
        {
          name: 'amount',
          isPrimaryKey: false
        },
        {
          name: 'id_user',
          isPrimaryKey: false
        },
        {
          name: 'payment_date',
          isPrimaryKey: false
        },
        {
          name: 'id_credit_card',
          isPrimaryKey: false
        }
      ]);
    });

    it('should have id_user, id_credit_card as foreign keys', async () => {
      await validateFields(PAYMENT_TABLE, [
        {
          name: 'id',
          isForeignKey: false
        },
        {
          name: 'amount',
          isForeignKey: false
        },
        {
          name: 'id_user',
          isForeignKey: true,
          references: USER_TABLE
        },
        {
          name: 'payment_date',
          isForeignKey: false
        },
        {
          name: 'id_credit_card',
          isForeignKey: true,
          references: CREDIT_CARD_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(PAYMENT_TABLE, [
        {
          name: 'id',
          isNullable: false
        },
        {
          name: 'amount',
          isNullable: false
        },
        {
          name: 'id_user',
          isNullable: false
        },
        {
          name: 'payment_date',
          isNullable: false
        },
        {
          name: 'id_credit_card',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ SONG_GENRE_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, SONG_GENRE_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(SONG_GENRE_TABLE, [
        {
          name: 'id_song',
          type: BIGINT_TYPE
        },
        {
          name: 'id_genre',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id_song, id_genre as primary key', async () => {
      await validateFields(SONG_GENRE_TABLE, [
        {
          name: 'id_song',
          isPrimaryKey: true
        },
        {
          name: 'id_genre',
          isPrimaryKey: true
        }
      ]);
    });

    it('should have id_song, id_genre as foreign keys', async () => {
      await validateFields(SONG_GENRE_TABLE, [
        {
          name: 'id_song',
          isForeignKey: true,
          references: SONG_TABLE
        },
        {
          name: 'id_genre',
          isForeignKey: true,
          references: GENRE_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(SONG_GENRE_TABLE, [
        {
          name: 'id_song',
          isNullable: false
        },
        {
          name: 'id_genre',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ PLAYLIST_SONG_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, PLAYLIST_SONG_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(PLAYLIST_SONG_TABLE, [
        {
          name: 'id_song',
          type: BIGINT_TYPE
        },
        {
          name: 'id_playlist',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id_song, id_playlist as primary key', async () => {
      await validateFields(PLAYLIST_SONG_TABLE, [
        {
          name: 'id_song',
          isPrimaryKey: true
        },
        {
          name: 'id_playlist',
          isPrimaryKey: true
        }
      ]);
    });

    it('should have id_song, id_playlist as foreign keys', async () => {
      await validateFields(PLAYLIST_SONG_TABLE, [
        {
          name: 'id_song',
          isForeignKey: true,
          references: SONG_TABLE
        },
        {
          name: 'id_playlist',
          isForeignKey: true,
          references: PLAYLIST_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(PLAYLIST_SONG_TABLE, [
        {
          name: 'id_song',
          isNullable: false
        },
        {
          name: 'id_playlist',
          isNullable: false
        }
      ]);
    });
  });

  describe(`Create "${ USER_SONG_TABLE }" table`, () => {

    it('should exist', async () => {
      await validateTableExists(DATABASE_NAME, USER_SONG_TABLE);
    });

    it('should have correct fields type', async () => {
      await validateFields(USER_SONG_TABLE, [
        {
          name: 'id_song',
          type: BIGINT_TYPE
        },
        {
          name: 'id_user',
          type: BIGINT_TYPE
        }
      ]);
    });

    it('should have id_song, id_user as primary key', async () => {
      await validateFields(USER_SONG_TABLE, [
        {
          name: 'id_song',
          isPrimaryKey: true
        },
        {
          name: 'id_user',
          isPrimaryKey: true
        }
      ]);
    });

    it('should have id_song, id_user as foreign keys', async () => {
      await validateFields(USER_SONG_TABLE, [
        {
          name: 'id_song',
          isForeignKey: true,
          references: SONG_TABLE
        },
        {
          name: 'id_user',
          isForeignKey: true,
          references: USER_TABLE
        }
      ]);
    });

    it('should\'nt have nullable fields', async () => {
      await validateFields(USER_SONG_TABLE, [
        {
          name: 'id_song',
          isNullable: false
        },
        {
          name: 'id_user',
          isNullable: false
        }
      ]);
    });
  });

  after(async () => {
    await query(`DROP DATABASE IF EXISTS ${ DATABASE_NAME }`);
  });
});
