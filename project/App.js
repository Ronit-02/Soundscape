import * as React from 'react';
import Navigation from './StackNavigator';
import { PlayerContext } from './PlayerContext';

export default function App() {
    return (
        <PlayerContext>
            <Navigation />
        </PlayerContext>
    );
}