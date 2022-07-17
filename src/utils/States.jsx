import {atom} from "recoil";

export const stepIndexState = atom({
	key: 'stepIndexState',
	default: 0
});

export const itemIndexState = atom({
	key: 'itemIndexState',
	default: 0
});

export const nowDescState = atom({
	key: 'nowDescState',
	default: ""
});

export const nowCodeState = atom({
	key: 'nowCodeState',
	default: {
		language: "",
		code: ""
	}
});
