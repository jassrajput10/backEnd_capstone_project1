import * as playerService from "../src/api/v1/service/playerService";
import * as firestoreRepository from "../src/api/v1/repositories/firebaseRepository";
import { player } from "../src/api/v1/models/playerModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firebaseRepository");

describe("Player Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Player Service", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should create player successfully", async () => {
            // Arrange
            const mockPlayerData: {
                name: string;
                position: string;
                jerseyNumber: string;
            } = {
                name: "Leo Messi",
                position: "Forward",
                jerseyNumber: "10",
            };

            const mockDocumentId: string = "test-player-id";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId
            );

            // Act
            const result: player = await playerService.createPlayer(
                mockPlayerData
            );

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "players",
                expect.objectContaining({
                    name: mockPlayerData.name,
                    position: mockPlayerData.position,
                    jerseyNumber: mockPlayerData.jerseyNumber,
                    registrationId: expect.any(Date),
                })
            );

            expect(result.id).toBe(mockDocumentId);
            expect(result.name).toBe(mockPlayerData.name);
        });

        it("should get all players successfully", async () => {
            // Arrange
            const docs = [
                {
                    id: "p1",
                    data: () => ({
                        name: "messi",
                        position: "Forward",
                        jerseyNumber: "10",
                        registrationId: { toDate: () => new Date("2025-01-01"),},
                    }),
                },
                {
                    id: "p2",
                    data: () => ({
                        name: "Neymar",
                        position: "Winger",
                        jerseyNumber: "11",
                        registrationId: { toDate: () => new Date("2025-02-01"), 

                        },
                    }),
                },
            ];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
                docs,
            });

            // Act
            const result: player[] = await playerService.getAllPlayers();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "players"
            );

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: "p1",
                name: "messi",
                position: "Forward",
                jerseyNumber: "10",
                registrationId: new Date("2025-01-01"),
            });
        });

        it("should delete a player successfully", async () => {
            // Arrange
            const mockId: string = "player-123";
            const mockPlayer: player = {
                id: mockId,
                name: "Iniesta",
                position: "Midfielder",
                jerseyNumber: "8",
                registrationId: new Date(),
            };

            jest
                .spyOn(playerService, "getPlayerById")
                .mockResolvedValue(mockPlayer);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await playerService.deletePlayer(mockId);

            // Assert
            expect(playerService.getPlayerById).toHaveBeenCalledWith(mockId);

            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "players",
                mockId
            );
        });
    });
});
