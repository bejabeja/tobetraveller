
import { jsonResponse } from '../utils/jsonResponse.js';




export const getUser = (req, res) => {
    res.status(200).json(
        jsonResponse(
            200,
            req.user
        )
    )
}