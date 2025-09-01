import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='play'
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name='room'
                options={{ headerShown: false }}
            />
            <Tabs.Screen
                name='friends'
                options={{ headerShown: false }}
            />
        </Tabs>
    )
}

export default _layout