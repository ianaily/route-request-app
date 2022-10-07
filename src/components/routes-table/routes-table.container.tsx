import { connect } from 'react-redux';

import { RoutesRequestState } from 'src/store/store.types';
import RoutesTable from './routes-table.component';

const mapStateToProps = (state: RoutesRequestState) => {
    return state;
};

export const RoutesTableContainer = connect(
    mapStateToProps,
)(RoutesTable);
