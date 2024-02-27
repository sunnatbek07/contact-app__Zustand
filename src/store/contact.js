import { create } from 'zustand';
import localforage from 'localforage';

const useContactStore = create((set) => ({
    contacts: [],
    addContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
    deleteContact: (index) =>
        set((state) => ({ contacts: state.contacts.filter((_, i) => i !== index) })),
    loadContacts: async () => {
        try {
            const storedContacts = await localforage.getItem('contacts');
            set({ contacts: storedContacts || [] });
        } catch (error) {
            console.error('Error loading contacts from local storage:', error);
        }
    },
    saveContacts: async () => {
        try {
            set((state) => {
                localforage.setItem('contacts', state.contacts);
                return state;
            });
        } catch (error) {
            console.error('Error saving contacts to local storage:', error);
        }
    },
}));

export default useContactStore;
