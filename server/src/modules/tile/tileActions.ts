import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific tile based on the provided ID
    const tile = {
      id: Number(req.params.id),
      type: String(req.body.type),
      coord_x: Number(req.body.coord_x),
      coord_y: Number(req.body.coord_y),
      has_treasure: Boolean(req.body.has_treasure),
    };

    const affectedRows = await tileRepository.update(tile);

    // If the tile is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tile in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
  edit,
};
