import React from 'react';
//import electron from 'electron';

const Store = window.require('electron-store');
const store = new Store();

export const saveTextbook = (JSONBook) => {
  console.log("textbook saved!!")
  store.set('textbook', JSON.stringify(JSONBook));
}

export const saveImage = (name, image) => {
  try {
    store.set(name, image);
    console.log("saveImage", name, "successful");
  } catch (e) {
    console.log("saveImage", name , "error");
  }
  
}

export const loadTextbook = () => {
  try {
    //console.log(JSON.parse(store.get('textbook')));
    return JSON.parse(store.get('textbook'));
  } catch (e) {
    console.log(e);
  }
}

export const loadImage = (name) => {
  try {
    //console.log(store.get(name));
    return store.get(name);
  } catch (e) {
    console.log(name, e);
    return null;
  }
  
}

// export const saveImage = () => {
//   let image = new Image();
//   image.src = "/Users/eui-chan/Documents/tonysCoding/textbook_editor2/src/textbook/fillRect.png"
//   store.set('image', image);
// }

