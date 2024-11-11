import { create } from "zustand";

export interface IUser {
  email: string;
  name: string;
  profilePicture: string;
}

interface IUserStore {
  user: IUser | null;
  setuser: (user: IUser | null) => void;
}

export const useUser = create<IUserStore>((set) => ({
  user: null,
  setuser: (user) => set({ user: user }),
}));
