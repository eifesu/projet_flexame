import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Data {
    users: User[];
    selectedUser: User | undefined;
}

interface Actions {
    setUsers: (to: User[]) => void;
    setSelectedUser: (to: User | undefined) => void;
}

const initialState: Data = {
    users: [],
    selectedUser: undefined,
};
export const useUsersPageStore = create<Data & Actions>()(
    immer((set) => ({
        ...initialState,
        setUsers: (to) => set({ users: to }),
        setSelectedUser: (to) => set({ selectedUser: to }),
    }))
);
