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
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select boat.id, boat.name, boat.coord_x, boat.coord_y, tile.id as tile_id, tile.type as type, tile.coord_x as tile_coord_x, tile.coord_y as tile_coord_y, tile.has_treasure from boat join tile on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y order by boat.coord_x, boat.coord_y",
    );
    // Return the array of tiles
    return rows as Boat[];
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from boat order by coord_y, coord_x where id=?",
      [id],
    );
    // Return the array of tiles
    return rows[0] as Boat[];
  }
  async update(boatToUpdate: Partial<Boat>) {
    // your code here
    const [result] = await databaseClient.query<Result>(
      "update boat set id=?,coord_x=?, coord_y=? where id=?",
      [
        boatToUpdate.id,
        boatToUpdate.coord_x,
        boatToUpdate.coord_y,
        boatToUpdate.id,
      ],
    );
    return result.affectedRows;
  }
}
export default new BoatRepository();
