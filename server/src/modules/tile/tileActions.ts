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
  try {
    const { coord_x, coord_y } = req.body;

    // Vérifie que coord_x et coord_y sont bien des entiers et dans les limites autorisées
    if (!Number.isInteger(coord_x) || !Number.isInteger(coord_y)) {
      res.sendStatus(422); // Envoie une réponse d'erreur
    } else if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422); // Envoie une réponse d'erreur
    } else {
      next(); // Les coordonnées sont valides, passe au middleware suivant
    }
  } catch (err) {
    next(err); // Si une erreur se produit, passe à l'erreur suivante
  }
};

export default {
  browse,
  validate,
};
