CREATE DATABASE bedu_music;

USE bedu_music;

CREATE TABLE artist(
  id BIGINT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE album(
  id BIGINT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  release_year SMALLINT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE artist_album(
  id_artist BIGINT NOT NULL,
  id_album BIGINT NOT NULL,
  PRIMARY KEY (id_artist, id_album),
  FOREIGN KEY (id_artist) REFERENCES artist(id),
  FOREIGN KEY (id_album) REFERENCES album(id)
);

CREATE TABLE song(
  id BIGINT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  release_year SMALLINT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE song_artist(
  id_artist BIGINT NOT NULL,
  id_song BIGINT NOT NULL,
  PRIMARY KEY (id_artist, id_song),
  FOREIGN KEY (id_artist) REFERENCES artist(id),
  FOREIGN KEY (id_song) REFERENCES song(id)
);

CREATE TABLE song_album(
  id_album BIGINT NOT NULL,
  id_song BIGINT NOT NULL,
  PRIMARY KEY (id_album, id_song),
  FOREIGN KEY (id_album) REFERENCES album(id),
  FOREIGN KEY (id_song) REFERENCES song(id)
);

CREATE TABLE genre(
  id BIGINT AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE song_genre(
  id_song BIGINT NOT NULL,
  id_genre BIGINT NOT NULL,
  PRIMARY KEY (id_song, id_genre),
  FOREIGN KEY (id_song) REFERENCES song(id),
  FOREIGN KEY (id_genre) REFERENCES genre(id)
);

CREATE TABLE user(
  id BIGINT AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  is_premium BOOLEAN NOT NULL,
  password VARCHAR(50) NOT NULL,
  created_date DATETIME NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE playlist(
  id BIGINT AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  created_date DATETIME NOT NULL,
  id_user BIGINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE credit_card(
  id BIGINT AUTO_INCREMENT,
  number CHAR(16) UNIQUE NOT NULL,
  expiration_date DATE NOT NULL,
  cvv CHAR(3) NOT NULL,
  id_user BIGINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE payment(
  id BIGINT AUTO_INCREMENT,
  payment_date DATETIME NOT NULL,
  amount DECIMAL(5,2) NOT NULL,
  id_user BIGINT NOT NULL,
  id_credit_card BIGINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) REFERENCES user(id),
  FOREIGN KEY (id_credit_card) REFERENCES credit_card(id)
);

CREATE TABLE playlist_song(
  id_song BIGINT NOT NULL,
  id_playlist BIGINT NOT NULL,
  PRIMARY KEY (id_song, id_playlist),
  FOREIGN KEY (id_song) REFERENCES song(id),
  FOREIGN KEY (id_playlist) REFERENCES playlist(id)
);

CREATE TABLE user_song(
  id_song BIGINT NOT NULL,
  id_user BIGINT NOT NULL,
  PRIMARY KEY (id_song, id_user),
  FOREIGN KEY (id_song) REFERENCES song(id),
  FOREIGN KEY (id_user) REFERENCES user(id)
);
