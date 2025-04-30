import { TrackAction, TrackActionTypes } from "@/types/track"
import axios from "axios"
import { Dispatch } from "react"


export const fetchTracks = () => {
    return async(dispacth: Dispatch<TrackAction>) => {
        try{
            const response = await axios.get('http://localhost:5000/tracks')
            console.log(response.data);
            dispacth({type: TrackActionTypes.FETCH_TRACKS, payload:response.data})
        } catch(e){
            dispacth({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Error while loading tracks'
            })
        }
    }
}