export const sendJsonResponse = (res, status, data) => {
	res.status(status).send(data);
};
