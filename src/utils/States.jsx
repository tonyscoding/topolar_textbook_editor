import {atom} from "recoil";

export const stepIndexState = atom({
	key: 'stepIndexState',
	default: 0
});

export const itemIndexState = atom({
	key: 'itemIndexState',
	default: 0
});

export const pageIndicatorState = atom({
	key: 'pageIndicatorState',
	default: 0
});
