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

/**
 * Retrieves a single match by ID
 * @param id - The ID of the match to retrieve
 * @returns The match data if found
 */
export const getMatchById = async (id: string): Promise<matches> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Match with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();

    const matchDetails: matches = {
        id: doc.id,
        ...data
    } as matches;

    return structuredClone(matchDetails);
};

/**
 * Updates an existing match
 * @param id - The ID of the match to update
 * @param matchData - The fields to update
 * @returns The updated match data
 */
export const updateMatch = async (
    id: string,
    matchData: Partial<Pick<matches, "currentGame" | "upcomingMatch" | "location" | "formation">>
): Promise<matches> => {
    const Match: matches = await getMatchById(id);

    if (!Match) {
        throw new Error(`Match with ID ${id} not found`);
    }

    const updatedMatch: matches = {
        ...Match,
        ...matchData,
    };

    if (matchData.currentGame !== undefined)
        updatedMatch.currentGame = matchData.currentGame;

    if (matchData.upcomingMatch !== undefined)
        updatedMatch.upcomingMatch = matchData.upcomingMatch;

    if (matchData.location !== undefined)
        updatedMatch.location = matchData.location;

    if (matchData.formation !== undefined)
        updatedMatch.formation = matchData.formation;

    await updateDocument<matches>(COLLECTION, id, updatedMatch);

    return structuredClone(updatedMatch);
};

/**
 * Deletes a match from the system
 * @param id - The ID of the match to delete
 * @throws Error if match with given ID does not exist
 */
export const deleteMatch = async (id: string): Promise<void> => {
    const Match: matches = await getMatchById(id);

    if (!Match) {
        throw new Error(`Match with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};