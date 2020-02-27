import React from "react";
import { DimmyLoader, EmptyContent } from "../../../components/content-loader";
import { Math } from '../../../utils';

const UserViewsTable = ({data, isDataLoading}) => {
    
    let content = <EmptyContent />;
    if (isDataLoading) {
        content = <DimmyLoader />;
    }

    if (data !== null) {
        const items = data.map((item, index) => {
            return(
                <tr key={index}>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        { item.online != 0 ? Math.seconds30toMars(item.online) : item.online}
                    </td>
                    <td> 
                        { item.archive != 0 ? Math.seconds30toMars(item.archive) : item.archive}
                    </td>
                </tr>
            )
        });

        return (
            <table className="table table-sm table-striped mb-0">
                <thead className="bg-light">
                    <tr>
                        <th scope="col" className="border-0">Tv channel</th>
                        <th scope="col" className="border-0">Online</th>
                        <th scope="col" className="border-0">Archive</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }

    

    return(
        <div className="col-md-12 col-sm-12 col mb-4" style={{padding: '5px'}}>
            <div className="card card-small"  style={{minHeight: '330px'}}>
                <div className="card-header border-bottom">
                    <h6 className="m-0">Online and archive views</h6>
                </div>
                <div className="card-body" style={{textAlign: 'center'}}>
                    { content }
                </div>
            </div>
        </div>
    );
};

export default UserViewsTable;