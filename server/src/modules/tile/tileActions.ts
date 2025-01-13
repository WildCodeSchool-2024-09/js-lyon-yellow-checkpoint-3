import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const coord_x = Number.parseInt(req.body.coord_x);
    const coord_y = Number.parseInt(req.body.coord_y);

    if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }

    const validateCoordinates = await tileRepository.readByCoordinates(
      coord_x,
      coord_y,
    );

    next();
  } catch (err) {
    return;
  }
};

export default {
  browse,
  validate,
};
