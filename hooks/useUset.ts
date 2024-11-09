import { create } from "zustand";

interface IUser {
  email: string;
  name: string;
}

interface IUserStore {
  user: IUser | null;
}

export const useUser = create<IUserStore>((set) => ({
  user: null,
}));
