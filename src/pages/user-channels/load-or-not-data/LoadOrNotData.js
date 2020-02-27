import React from 'react';
import { DimmyLoader, EmptyContent } from "../../../components/content-loader";

const LoadORNotData = ({ isDataLoading }) => {
    let content = <EmptyContent />;
    if (isDataLoading) {
        content = <DimmyLoader />;
    }
    return(

        <div className="col-md-12 col-sm-12 col mb-4" style={{padding: '5px'}}>
            <div className="card card-small"  style={{minHeight: '330px'}}>
                <div className="card-header border-bottom">
                    <h6 className="m-0">Unique users</h6>
                </div>
                <div className="card-body" style={{textAlign: 'center'}}>
                    { content }
                </div>
            </div>
        </div>
    )
};

export default LoadORNotData;