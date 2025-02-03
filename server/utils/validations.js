export const validateUserId = (userId) => {
    const parsedId = Number(userId);
    if (isNaN(parsedId) || parsedId <= 0) {
        throw new Error("Invalid user ID");
    }
    return parsedId;
}