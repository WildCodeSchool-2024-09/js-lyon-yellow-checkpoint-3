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

const validate: RequestHandler = async (req, res, next): Promise<void> => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];
  const { coord_x, coord_y } = req.body;

  if (coord_x === undefined || coord_y === undefined) {
    errors.push({
      field: "coord_x / coord_y",
      message: "Coordonnées X et Y obligatoires",
    });
  } else {
    if (coord_x < 0 || coord_x > 11) {
      errors.push({ field: "coord_x", message: "X doit être entre 0 et 11." });
    }

    if (coord_y < 0 || coord_y > 5) {
      errors.push({ field: "coord_y", message: "Y doit être entre 0 et 5." });
    }
  }

  if (errors.length > 0) {
    res.sendStatus(422);
  }

  next();
};

export default {
  browse,
  validate,
};
