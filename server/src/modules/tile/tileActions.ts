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

const validate: RequestHandler = async (req, res, next) => {
  type ValidationError = {
    field: string;

    message: string;
  };

  const errors: ValidationError[] = [];

  const { coord_x } = req.body;
  const { coord_y } = req.body;

  if (typeof coord_x !== "number" || coord_x < 0 || coord_x > 11) {
    errors.push({
      field: "coord_x",
      message: "not includes",
    });
  }
  if (typeof coord_y !== "number" || coord_y < 0 || coord_y > 5) {
    errors.push({
      field: "coord_y",
      message: "not includes",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.sendStatus(422).json({ validationErrors: errors });
  }
};

export default {
  browse,
  validate,
};

// - `npm run test step4` : créer un middleware dans `server/app/modules/tile/tileActions.ts` pour tester si une tuile avec les coordonnées `req.body.coord_x` et `req.body.coord_y` existe ou non dans la base de données.
// - Pour cette étape, idéalement tu dois utiliser `tileRepository` pour trouver des tuiles à partir de leurs coordonnées
// (tu dois compléter la méthode `readByCoordinates` de la classe `TileRepository`).
// - Si tu as des difficultés à utiliser `tileRepository`, tu peux t'en passer en vérifiant que la coordonnée X est comprise entre 0
// et 11 (inclus), et que la coordonnée Y est comprise entre 0 et 5 (inclus).
// - Si les coordonnées sont valides, passe au suivant. Sinon, répond avec un statut `422`.
