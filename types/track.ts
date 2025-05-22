export interface IComment {
  id: number; 
  text: string;
  user: IUser;
}

export interface IUser{
  id: number; 
  email: string;
  username: string;
}


export interface ITrack{
    id: string;
    title: string;
    artist: string;
    description: string;
    popularity: number;
    image: string;
    genre: string;
    audio: string;
    releaseDate: string;
    duration: string;
    comments: IComment[]
}

export interface TrackState{
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes{
    FETCH_TRACKS = 'FETCH_TRAKCS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR'
}

interface FetchTracksAction{
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[]
}


interface FetchTracksErrorAction{
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}
export type TrackAction = FetchTracksAction | FetchTracksErrorAction