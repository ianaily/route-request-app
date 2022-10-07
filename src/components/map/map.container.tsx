import { connect } from 'react-redux';

import { RoutesRequestState } from 'src/store/store.types';
import Map from './map.component';
import { MapProps } from 'src/components/map/map.types';

const mapStateToProps = (state: RoutesRequestState): MapProps => {
    return {
        defaultPosition: [51.505, -0.09],
        loadingPoint: state.currentRoute?.loadingPoint,
        unloadingPoint: state.currentRoute?.unloadingPoint
};
};

export const MapContainer = connect(
    mapStateToProps,
)(Map);
