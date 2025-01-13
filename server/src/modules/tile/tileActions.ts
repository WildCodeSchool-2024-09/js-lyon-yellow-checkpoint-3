import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  type ValidationError = {
    id: number;
    coord_x: number;
    coord_y: number;
  };
  try {
    const { coord_x, coord_y } = req.body;
    if (!Number.isInteger(coord_x) || !Number.isInteger(coord_y)) {
      res.sendStatus(422);
    } else if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
export default {
  browse,
  validate,
};
