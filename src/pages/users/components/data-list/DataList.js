import React from 'react';

const filter = (arr) => {
    return arr.sort((a,b) => {
        return a.tz - b.tz;
    })
};

const DataList = ({ totalUsersData, usersData, durationChannelsData, eventType }) => {
    let duration = 0;

    if (eventType == 'all') {
        for (let key in durationChannelsData) {
            duration += +durationChannelsData[key].archive + +durationChannelsData[key].online;
        }
    }

    if (eventType == 0) {
        for (let key in durationChannelsData) {
            duration += +durationChannelsData[key].online;
        }
    }

    if (eventType == 1) {
        for (let key in durationChannelsData) {
            duration += +durationChannelsData[key].archive;
        }
    }

    let quantityForAllDays = 0;

    usersData.appUsers.forEach((element) => {
        quantityForAllDays += +element.ctn;
    });

    return(
        <>
            <ul className="list-group list-group-small list-group-flush">
                <li className="list-group-item d-flex px-3">
                    <span className="text-semibold text-fiord-blue">Общее время просмотра</span>
                    <span className="ml-auto text-right text-semibold text-reagent-gray">
                        { (duration/120).toFixed(2) } часов
                    </span>
                </li>
                <li className="list-group-item d-flex px-3">
                    <span className="text-semibold text-fiord-blue">Среднее количество дней пользования на одного пользователя</span>
                    <span className="ml-auto text-right text-semibold text-reagent-gray">
                        { (quantityForAllDays/totalUsersData).toFixed(5) }
                    </span>
                </li>
            </ul>
        </>
    )
};

export default DataList;