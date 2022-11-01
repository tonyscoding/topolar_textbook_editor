import {atom} from "recoil";
import tutorial from "@/textbook/Textbook_lv0_0_tutorial/Textbook_lv0_0_tutorial.json";

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

export const JSONbookState = atom({
	key: 'JSONbookState',
	default: tutorial
})

export const userState = atom({
	key: "user",
	default: null
})

export const curriculumState = atom({
	key: "curriculum",
	default: {}
})

export const levelItemState = atom({
	key: "levelItem",
	default: {}
})

export const serverTextbookOpenState = atom({
	key: "serverTextbookOpenState",
	default: true
})

export const courseListState = atom({
	key: "courseListState",
	default: []
})

export const quickLoadState = atom({
	key: "quickLoadState",
	default: true
})

export const languageListState = atom({
	key: "languageListState",
	default: []
})