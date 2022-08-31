import React from 'react';
//import electron from 'electron';

const Store = window.require('electron-store');
const store = new Store();

export const saveTextbook = (JSONBook) => {
    console.log("textbook saved!!")
    store.set('textbook', JSON.stringify(JSONBook));
}

export const loadTextbook = () => {
    try {
        //console.log(JSON.parse(store.get('textbook')));
        return JSON.parse(store.get('textbook'));
    } catch (e) {
        console.log(e);
    }
}
