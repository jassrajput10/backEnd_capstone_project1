import * as tournamentService from "../src/api/v1/service/tournamentService";
import * as firestoreRepository from "../src/api/v1/repositories/firebaseRepository";
import { tournament } from "../src/api/v1/models/tournamentModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firebaseRepository");

describe("Tournament Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createTournament", () => {
        it("should create a tournament successfully", async () => {
            // Arrange
            const mockTournamentData = {
                tournamentName: "Champions League",
                tournamentPosition: "Quarter Finals",
                upcomingTournamnet: "Semi Finals",
            };

            const mockTournamentId = "tournament-123";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockTournamentId
            );

            // Act
            const result: tournament = await tournamentService.createTournament(
                mockTournamentData
            );

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "tournaments",
                expect.objectContaining({
                    ...mockTournamentData,
                    tournamentStart: expect.any(Date),
                })
            );

            expect(result.id).toBe(mockTournamentId);
            expect(result.tournamentName).toBe(mockTournamentData.tournamentName);
        });
    });

    describe("getAllTournaments", () => {
        it("should return all tournaments", async () => {
            // Arrange
            const mockDocs = [
                {
                    id: "t1",
                    data: () => ({
                        tournamentName: "CL",
                        tournamentPosition: "Group Stage",
                        upcomingTournamnet: "Round of 16",
                        tournamentStart: { toDate: () => new Date("2025-01-01") },
                    }),
                },
                {
                    id: "t2",
                    data: () => ({
                        tournamentName: "Europa League",
                        tournamentPosition: "Final",
                        upcomingTournamnet: "N/A",
                        tournamentStart: { toDate: () => new Date("2025-02-01") },
                    }),
                },
            ];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
                docs: mockDocs,
            });

            // Act
            const result: tournament[] = await tournamentService.getAllTournaments();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "tournaments"
            );

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: "t1",
                tournamentName: "CL",
                tournamentPosition: "Group Stage",
                upcomingTournamnet: "Round of 16",
                tournamentStart: new Date("2025-01-01"),
            });
        });
    });

    describe("getTournamentById", () => {
        it("should return a tournament by ID", async () => {
            // Arrange
            const mockDoc = {
                id: "t1",
                data: () => ({
                    tournamentName: "CL",
                    tournamentPosition: "Group Stage",
                    upcomingTournamnet: "Round of 16",
                    tournamentStart: { toDate: () => new Date("2025-01-01") },
                }),
            };

            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                mockDoc
            );

            // Act
            const result: tournament = await tournamentService.getTournamentById(
                "t1"
            );

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "tournaments",
                "t1"
            );

            expect(result).toEqual({
                id: "t1",
                tournamentName: "CL",
                tournamentPosition: "Group Stage",
                upcomingTournamnet: "Round of 16",
                tournamentStart: new Date("2025-01-01"),
            });
        });

        it("should throw error if tournament not found", async () => {
            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

            await expect(
                tournamentService.getTournamentById("notfound")
            ).rejects.toThrow("Tournament with ID notfound not found");
        });
    });

    describe("updateTournament", () => {
        it("should update tournament successfully", async () => {
            // Arrange
            const mockTournament: tournament = {
                id: "t1",
                tournamentName: "CL",
                tournamentPosition: "Group Stage",
                upcomingTournamnet: "Round of 16",
                tournamentStart: new Date(),
            };

            jest.spyOn(tournamentService, "getTournamentById").mockResolvedValue(
                mockTournament
            );

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            const updateData = {
                tournamentName: "Champions Cup",
                tournamentPosition: "Quarter Finals",
                upcomingTournamnet: "Yes"
};

            // Act
            const result = await tournamentService.updateTournament(
                "t1",
                updateData
            );

            // Assert
            expect(tournamentService.getTournamentById).toHaveBeenCalledWith("t1");
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "tournaments",
                "t1",
                expect.objectContaining({ ...mockTournament, ...updateData })
            );

            expect(result.tournamentPosition).toBe("Quarter Finals");
        });
    });

    describe("deleteTournament", () => {
        it("should delete tournament successfully", async () => {
            // Arrange
            const mockTournament: tournament = {
                id: "t1",
                tournamentName: "CL",
                tournamentPosition: "Group Stage",
                upcomingTournamnet: "Round of 16",
                tournamentStart: new Date(),
            };

            jest.spyOn(tournamentService, "getTournamentById").mockResolvedValue(
                mockTournament
            );

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await tournamentService.deleteTournament("t1");

            // Assert
            expect(tournamentService.getTournamentById).toHaveBeenCalledWith("t1");
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "tournaments",
                "t1"
            );
        });
    });
});
