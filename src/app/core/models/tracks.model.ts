import { Artist } from './artist.model';
export interface Tracks {
  name: string;
  album: string;
  cover: string;
  url: string;
  _id: string | number;
  artist?: Artist;
}
