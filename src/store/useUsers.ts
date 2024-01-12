import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import db from "../lib/firebase";
import { useUsersPageStore } from "../pages/(admin)/users/_store";

const useUsers = () => {
    // Firestore collection reference
    const usersRef = collection(db, "users");
    const { setUsers } = useUsersPageStore();
    // Function to create a new user
    const createUser = async (
        userData: Omit<User, "id">
    ): Promise<string | Error> => {
        try {
            const docRef = await addDoc(usersRef, userData);
            getAllUsers();
            return docRef.id;
        } catch (error) {
            return new Error("Error adding document: " + error);
        }
    };

    // Helper function to transform Firestore data to User type
    const userFromSnapshot = (
        doc: QueryDocumentSnapshot<DocumentData>
    ): User => {
        // @ts-expect-error Happy ts now
        return { id: doc.id, ...(doc.data() as User) };
    };

    // Function to get all users
    const getAllUsers = async (): Promise<User[] | Error> => {
        try {
            const querySnapshot = await getDocs(usersRef);
            const arr = querySnapshot.docs.map(userFromSnapshot);
            if (Array.isArray(arr)) {
                setUsers(arr);
            }
            return arr;
        } catch (error) {
            return new Error("Error fetching documents: " + error);
        }
    };

    // Function to get a user by ID
    const getUserById = async (id: string): Promise<User | null | Error> => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return userFromSnapshot(docSnap);
            } else {
                return null;
            }
        } catch (error) {
            return new Error("Error fetching document: " + error);
        }
    };

    // Function to update a user
    const updateUser = async (
        id: string,
        updatedData: Partial<User>
    ): Promise<void | Error> => {
        try {
            const userDoc = doc(db, "users", id);
            await updateDoc(userDoc, updatedData);
            getAllUsers();
        } catch (error) {
            return new Error("Error updating document: " + error);
        }
    };

    // Function to delete a user
    const deleteUser = async (id: string): Promise<void | Error> => {
        try {
            const userDoc = doc(db, "users", id);
            await deleteDoc(userDoc);
            getAllUsers();
        } catch (error) {
            return new Error("Error deleting document: " + error);
        }
    };

    return { createUser, getAllUsers, getUserById, updateUser, deleteUser };
};

export default useUsers;
