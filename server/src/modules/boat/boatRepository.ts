import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Exécuter une requête SQL avec une jointure pour récupérer les informations du bateau et de la tuile
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        boat.id AS boat_id,
        boat.name AS boat_name,
        boat.coord_x AS boat_coord_x,
        boat.coord_y AS boat_coord_y,
        tile.id AS tile_id,
        tile.type AS tile_type,  -- Sélection du type de la tuile
        tile.coord_x AS tile_coord_x,
        tile.coord_y AS tile_coord_y,
        tile.has_treasure AS tile_has_treasure
      FROM boat
      JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
      ORDER BY boat.coord_y, boat.coord_x`,
    );

    // Mapper les résultats en utilisant les noms de propriétés attendus par les tests
    return rows.map((row) => ({
      id: row.boat_id,
      name: row.boat_name,
      coord_x: row.boat_coord_x,
      coord_y: row.boat_coord_y,
      // Utilisation des noms de propriétés attendus par les tests : "type" et "has_treasure"
      type: row.tile_type, // Utilisation de "type" au lieu de "tile_type"
      has_treasure: row.tile_has_treasure, // Utilisation de "has_treasure" au lieu de "tile_has_treasure"
    }));
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
