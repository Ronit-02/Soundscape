import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs, HeaderTabs } from './StackNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <HeaderTabs />
            {/* <BottomTabs /> */}
        </NavigationContainer>
    );
}