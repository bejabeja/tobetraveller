import { INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { getUserBy } from '../repositories/userRepository.js';
import { getAllUserTravelsBy, saveUserTravels } from '../repositories/userTravelsRepository.js';

export const getUserTravels = async (req, res) => {
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
}

export const saveUserTravel = async (req, res) => {
    try {
        const { userTravel, userId } = req.body

        const user = await getUserBy(userId);
        if (!user) {
            return res.status(404).json(
                jsonResponse(404, { message: USER_NOT_FOUND })
            );
        }

        await saveUserTravels(userTravel, userId)

        const allUserTravels = await getAllUserTravelsBy(userId)
        return res.status(201).json(
            jsonResponse(201, { userTravels: allUserTravels })
        )

    } catch (error) {
        console.log('Error saving userTravels:', error);
        return res.status(500).json(
            jsonResponse(
                500,
                { message: INTERNAL_SERVER_ERROR }
            )
        )
    }
}