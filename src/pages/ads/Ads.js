import React, { Component } from 'react';
import DropDownList from "../../components/drop-down-list";
import { apiFetch } from "../../services/api/Api";
import CustomDatePicker from "../../components/custom-date-picker";
import AdsButtons from "../../components/ads-buttons";

export default class Ads extends Component{
    state = {
        fields: {
            dropDownList: {
                label: "Приложения",
                options: [],
                isValid: false,
                isTouch: false,
                value: ''
            },
            datePicker1: {
                label: "Начало периода",
                value: null,
                isValid: false,
                isTouch: false,
                minDate: null,
                maxDate: null
            },
            datePicker2: {
                label: "Конец периода",
                value: null,
                isValid: false,
                isTouch: false,
                minDate: null,
                maxDate: null
            },
            buttons: [
                {label: 'all', active: true},
                {label: 'online', active: false},
                {label: 'archive', active: false},
            ]
        },
        formValid: false
    };

    async componentDidMount() {
        const data = await apiFetch('/api/v1/general/get-app');
        const period = await apiFetch('/api/v1/general/get-period');

        const newFields = Object.assign({}, this.state.fields);
        newFields.dropDownList.options = data.app;
        newFields.datePicker1.minDate = period.period[0];
        newFields.datePicker1.maxDate = period.period[1];
        newFields.datePicker2.minDate = period.period[0];
        newFields.datePicker2.maxDate = period.period[1];

        await this.setState({
            fields: newFields
        });
    }

    onChangeDropDownListHandler = async (value) => {
        const isTouch = true;
        let isValid = true;

        if(value === '') {
            isValid = false;
        }

        const newFields = Object.assign({}, this.state.fields);
        newFields.dropDownList.isTouch = isTouch;
        newFields.dropDownList.isValid = isValid;
        newFields.dropDownList.value = value;

        await this.setState({
            fields: newFields
        });
    };

    onChangeDatePickerHandler = async (date, name) => {
        let isValid = false;
        let value = null;

        if(!isNaN(date)) {
            isValid = true;
            value = date;
        }

        const newFields = Object.assign({}, this.state.fields);

        newFields[name].isTouch = true;
        newFields[name].isValid = isValid;
        newFields[name].value = value;

        if (name === 'datePicker1') {
            newFields.datePicker2.minDate = value;
        }

        if (name === 'datePicker2') {
            newFields.datePicker1.maxDate = value;
        }

        await this.setState({
            fields: newFields
        });
    };

    onClickButtonsHandler = async (label) => {
        const newFields = Object.assign({}, this.state.fields);
        const newButtons = newFields.buttons.map((item) => {

            if(item.label === label) {
                item.active = true;

                return item;
            }

            item.active = false;

            return item;

        });

        newFields.buttons = newButtons;
        await this.setState({
            fields: newFields
        });

    };

    checkFields = async () => {
        const newFields = Object.assign({}, this.state.fields);
        let formValid = true;

        if (newFields.dropDownList.isValid === false) {
            formValid = false;
            newFields.dropDownList.isTouch = true;
        }

        if (newFields.datePicker1.isValid === false) {
            formValid = false;
            newFields.datePicker1.isTouch = true;
        }

        if (newFields.datePicker2.isValid === false) {
            formValid = false;
            newFields.datePicker2.isTouch = true;
        }

        await this.setState({
            fields: newFields,
            formValid
        });

        return formValid;
    };

    checkAndSubmit = async (e) => {
        e.preventDefault();
        await this.checkFields();

        if(this.state.formValid) {
            const app = this.state.fields.dropDownList.value;
            const dayBegin = this.state.fields.datePicker1.value;
            const dayEnd = this.state.fields.datePicker2.value;
            const eventType = this.state.fields.buttons.filter((item) => item.active === true)[0].label;

            const adsData =  await apiFetch('/api/v1/general/get-ads-data', {
                method: 'POST',
                body: JSON.stringify({app, dayBegin, dayEnd, eventType})
            });

            console.log(adsData);

        }
    };

    render() {
        return(
            <>
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-4 mb-sm-0">
                        <span className="text-uppercase page-subtitle">Обзор</span>
                        <h3 className="page-title">Рекламная статистика</h3>
                    </div>
                </div>
                <form onSubmit={ (e) => this.checkAndSubmit(e)}>
                    <div className="form-row">
                        <DropDownList changeInput={ this.onChangeDropDownListHandler } { ...this.state.fields.dropDownList }/>
                        <CustomDatePicker changeDatePicker={ this.onChangeDatePickerHandler } name={ 'datePicker1' } { ...this.state.fields.datePicker1 }/>
                        <CustomDatePicker changeDatePicker={ this.onChangeDatePickerHandler } name={ 'datePicker2' } { ...this.state.fields.datePicker2 }/>
                        <AdsButtons clickButtons={ this.onClickButtonsHandler } buttons={ this.state.fields.buttons } />
                    </div>
                    <button type="submit" className="mb-2 btn btn-sm btn-success mr-1">Применить</button>
                </form>
            </>
        )
    }
}