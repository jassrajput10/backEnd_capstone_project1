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

/**
 * Retrieves a single player info by ID from the database
 * @param id - This ID of the item to retrieve
 * @returns The player if found
 */
export const getPlayerById = async (id: string): Promise<player> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Player with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const createdPlayer: player = {
        id: doc.id,
        ...data,
    } as player;

    return structuredClone(createdPlayer);
};


/**
 * Updates an existing player info
 * @param id - The ID of the player to update
 * @param playerData - The fields to update
 * @returns The updated player data
 * @throws Error if player with given ID is not found
 */
export const updatePlayer = async (
    id: string,
    playerData: Pick<player, "name" | "position" | "jerseyNumber">
): Promise<player> => {
    // check if the item exists before updating
    const Player: player = await getPlayerById(id);
    if (!Player) {
        throw new Error(`player with ID ${id} not found`);
    }

    const updatePlayer: player = {
        ...Player,
    };


    if (playerData.name !== undefined) updatePlayer.name = playerData.name;
    if (playerData.position !== undefined)
        updatePlayer.position = playerData.position;
    if (playerData.jerseyNumber !== undefined) updatePlayer.jerseyNumber = playerData.jerseyNumber;

    await updateDocument<player>(COLLECTION, id, updatePlayer);

    return structuredClone(updatePlayer);
};
