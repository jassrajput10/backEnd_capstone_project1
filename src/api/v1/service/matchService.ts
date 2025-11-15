import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import { matches } from "../models/matchModel";

import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firebaseRepository";

// reference to the firestore collection name
const COLLECTION: string = "matches";

/**
 * Retrieves all matches from the database
 * @returns array of match data
 */
export const getAllMatches = async (): Promise<matches[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

        const matchesList: matches[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();

            return {
                id: doc.id,
                ...data,
                matchDate: data.matchDate.toDate()
            } as matches;
        });

        return matchesList;

    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Creates a new match entry
 * @param matchData - The data for the new match
 * @returns The created match with generated ID
 */
export const createMatch = async (matchData: {
    currentGame: string;
    upcomingMatch: string;
    location: string;
    formation: string;
}): Promise<matches> => {

    const dateNow = new Date();

    const newMatch: Partial<matches> = {
        ...matchData,
        matchDate: dateNow,
    };

    const matchId: string = await createDocument<matches>(COLLECTION, newMatch);

    return structuredClone({ id: matchId, ...newMatch } as matches);
};

