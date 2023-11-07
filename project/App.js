import * as React from 'react';
import Navigation from './src/navigation/StackNavigator';
import { PlayerProvider } from './contexts/Player';

export default function App() {

    const [currentTrack, setCurrentTrack] = React.useState(null);

    return (
        <PlayerProvider value={{currentTrack, setCurrentTrack}}>
            <Navigation />
        </PlayerProvider>
    );
}