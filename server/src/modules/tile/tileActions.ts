import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const rows = await tileRepository.readAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
