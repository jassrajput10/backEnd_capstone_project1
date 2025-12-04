import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { tournament } from "../models/tournamentModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firebaseRepository";

const COLLECTION: string = "tournaments";

/**
 * Retrieves all tournaments from the database
 * @returns array of tournaments
 */
export const getAllTournaments = async (): Promise<tournament[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

        const tournaments: tournament[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();

            return {
                id: doc.id,
                ...data,
                tournamentStart: data.tournamentStart.toDate()
            } as tournament;
        });

        return tournaments;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Creates a new tournament
 * @param tournamentData - The data for the new tournament
 * @returns The created tournament
 */
export const createTournament = async (tournamentData: {
    tournamentName: string;
    tournamentPosition: string;
    upcomingTournamnet: string;
}): Promise<tournament> => {

    const dateNow = new Date();
    const newTournament: Partial<tournament> = {
        ...tournamentData,
        tournamentStart: dateNow,
    };

    const tournamentId: string = await createDocument<tournament>(
        COLLECTION,
        newTournament
    );

    return structuredClone({
        id: tournamentId,
        ...newTournament,
    } as tournament);
};

/**
 * Retrieves a single tournament by ID
 * @param id - Tournament ID
 * @returns The tournament if found
 */
export const getTournamentById = async (id: string): Promise<tournament> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Tournament with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();

    const Tournament: tournament = {
        id: doc.id,
        ...data,
        tournamentStart: data?.tournamentStart?.toDate()
    } as tournament;

    return structuredClone(Tournament);
};

/**
 * Updates an existing tournament
 * @param id - Tournament ID
 * @param tournamentData - The fields to update
 * @returns Updated tournament
 */
export const updateTournament = async (
    id: string,
    tournamentData: Pick<tournament,
        "tournamentName" |
        "tournamentPosition" |
        "upcomingTournamnet"
    >
): Promise<tournament> => {

    const Tournament: tournament = await getTournamentById(id);
    if (!Tournament) {
        throw new Error(`Tournament with ID ${id} not found`);
    }

    const updatedTournament: tournament = {
        ...Tournament,
    };

    if (tournamentData.tournamentName !== undefined)
        updatedTournament.tournamentName = tournamentData.tournamentName;

    if (tournamentData.tournamentPosition !== undefined)
        updatedTournament.tournamentPosition = tournamentData.tournamentPosition;

    if (tournamentData.upcomingTournamnet !== undefined)
        updatedTournament.upcomingTournamnet = tournamentData.upcomingTournamnet;

    await updateDocument<tournament>(COLLECTION, id, updatedTournament);

    return structuredClone(updatedTournament);
};

/**
 * Deletes a tournament
 * @param id - Tournament ID
 */
export const deleteTournament = async (id: string): Promise<void> => {
    const Tournament: tournament = await getTournamentById(id);

    if (!Tournament) {
        throw new Error(`Tournament with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};
