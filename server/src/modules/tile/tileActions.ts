import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific livre based on the provided ID
    const tile = {
      id: Number(req.params.id),
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };

    const affectedRows = await tileRepository.update(tile);

    // If the livre is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the livre in JSON format
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
  edit,
  validate,
};
