import express from 'express';
import { jsonResponse } from '../utils/jsonResponse.js';
import { INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js'
import { getAllUserTravelsBy } from '../repositories/userTravelsRepository.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userId = parseInt(req.query.userId)
        const userTravels = await getAllUserTravelsBy(userId);

        return res.status(200).json(
            jsonResponse(
                200,
                userTravels
            )
        )

    } catch (error) {
        console.log('Error fetching userTravels:', error);
        return res.status(500).json(
            jsonResponse(
                500,
                { message: INTERNAL_SERVER_ERROR }
            )
        )
    }
})

export default router;