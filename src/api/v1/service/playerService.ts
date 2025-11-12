import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { player } from "../models/playerModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firebaseRepository";

// reference to the firestore collection name
const COLLECTION: string = "players";

/**
 * retrieves all players data from storage
 * @returns array of all players
 */
export const getAllPlayers = async (): Promise<player[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const players: player[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,

            } as player;
        });

        return players;
    } catch (error: unknown) {
        throw error;
    }
};
