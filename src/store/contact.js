import { create } from "zustand";

const useContact = create((set) => ({
    contact: [],
    addContact: ({ tel, email, tg }) => set((state) => ({
        contact: [...state.contact, { tel, email, tg }]
    })),
}))

export default useContact;