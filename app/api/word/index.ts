import * as express from "express";
import { WordController } from './word.controller';

const router = express.Router();

const wordController = new WordController();

// Add all routes

/**
 * @api {get} /v1/word?gameType=:gameType Request random word
 * @apiName GetU
 * @apiGroup 1 WordService
 *
 * @apiParam {gameType="firstName","stateName"} [gameType="firstName"]
 * @apiSuccess {String} random random word.
 */
// Though word and words mean different as per REST constrains (but below * is user friendly)

router.get('/v1/word*', wordController.getWord());

module.exports = router;

