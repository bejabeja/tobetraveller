import { jsonResponse } from '../utils/jsonResponse.js';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(
        jsonResponse(
            200,
            req.user
        )
    )
})

export default router;