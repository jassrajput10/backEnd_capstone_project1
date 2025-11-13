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
                registrationId: data.registrationId.toDate(),
            } as player;
        });

        return players;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * creates a new player to team
 * @param playerData - The data for the new player
 * @returns The created player with generated ID
 */
export const createPlayer = async (playerData : {
     name: string;
    position: string;
    jerseyNumber: string;
}): Promise<player> => {
    const dateNow = new Date();
    const newPlayer: Partial<player> = {
        ...playerData,
        registrationId: dateNow,
    };

    const playerId: string = await createDocument<player>(COLLECTION, newPlayer);

    return structuredClone({ id: playerId, ...newPlayer} as player);
};