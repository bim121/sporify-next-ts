import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const useFetcher = (callback: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        callback()(dispatch);
    }, []);
};