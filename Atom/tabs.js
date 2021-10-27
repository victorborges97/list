import { atom, selector } from "recoil";

const { persistAtom } = recoilPersist({
    key: 'recoil-persist-todos-todo',
});

export const todosListState = atom({
    key: "todosListState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const todosListSize = selector({
    key: "todosListSize",
    get: ({ get }) => (get(todosListState)).length
});