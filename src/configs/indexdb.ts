export const idbConfig = {
  databaseName: "diona-world-db",
  version: 1,
  stores: [
    {
      name: "tcg-deck",
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "name", keyPath: "name", options: { unique: true } },
        { name: "characters", keyPath: "characters" },
        { name: "cards", keyPath: "cards" },
      ],
    },
  ],
};
