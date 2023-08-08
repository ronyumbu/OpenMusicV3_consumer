const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const queryPlaylist = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId]
    }

    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM songs
      JOIN playlistsongs ON songs.id = playlistsongs.song_id
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId]
    }

    const resultPlaylist = await this._pool.query(queryPlaylist);
    const resultSongs = await this._pool.query(querySongs);
    return { playlist: { ...resultPlaylist.rows[0], songs: resultSongs.rows } };
  }
}

module.exports = PlaylistsService;