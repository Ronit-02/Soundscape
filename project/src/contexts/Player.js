import { createContext, useContext } from "react";

const PlayerContext = createContext({
    currentTrack: [],
    
});

export const PlayerProvider = PlayerContext.Provider;

export const usePlayer = () => {
    return useContext(PlayerContext);
}