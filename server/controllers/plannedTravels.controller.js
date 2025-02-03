import { INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { validateUserId } from '../utils/validations.js';


export default class PlannedTravelsController {

    constructor(plannedTravelsService) {
        this.plannedTravelsService = plannedTravelsService;
    }

    async getUserTravels(req, res) {
        try {
            const userId = validateUserId(req.query.userId);

            const userTravels = await this.plannedTravelsService.getPlannedTravelsBy(userId);

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
                    { error: INTERNAL_SERVER_ERROR }
                )
            )
        }
    }


    async saveUserTravel(req, res) {
        try {
            const userId = validateUserId(req.body.userId);
            const plannedTravel = req.body.userTravel

            await this.plannedTravelsService.savePlannedTravel(plannedTravel, userId)

            const allPlannedTravels = await this.plannedTravelsService.getPlannedTravelsBy(userId)
            return res.status(201).json(
                jsonResponse(201, { userTravels: allPlannedTravels })
            )

        } catch (error) {
            console.log('Error saving userTravels:', error);
            return res.status(500).json(
                jsonResponse(
                    500,
                    { error: INTERNAL_SERVER_ERROR }
                )
            )
        }
    }
}
