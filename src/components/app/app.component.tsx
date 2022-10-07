import React from 'react';

import { RoutesTableContainer } from 'src/components/routes-table/routes-table.container';
import { MapContainer } from 'src/components/map/map.container';
import ResizableContainer from 'src/components/resizable-container/resizable-container.component';
import './app.style.css';

export default function App() {
    return (
        <div className="App">
            <ResizableContainer
                left={<RoutesTableContainer/>}
                right={
                    <MapContainer/>
                }
            />
        </div>
    );
}
