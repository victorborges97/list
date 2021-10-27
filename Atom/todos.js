import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = typeof localStorage !== 'undefined' && window.localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
        typeof localStorage !== 'undefined' && window.localStorage.setItem(key, JSON.stringify(newValue));
    });
};

const { persistAtom } = recoilPersist({
    key: 'recoil-persist-todos-todo',
});

export const todosListState = atom({
    key: "todosListState",
    default: [],
    effects_UNSTABLE: [
        localStorageEffect("todosListState"),
        persistAtom
    ],
});
export const todosListSize = selector({
    key: "todosListSize",
    get: ({ get }) => (get(todosListState)).length
});


export const tabsListState = atom({
    key: "tabsListState",
    default: [],
    effects_UNSTABLE: [
        localStorageEffect("tabsListState"),
        persistAtom
    ],
});
export const tabsListSize = selector({
    key: "tabsListSize",
    get: ({ get }) => (get(tabsListState)).length
});