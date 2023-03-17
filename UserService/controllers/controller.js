export default class Controller {
    routeNotFoundHandler(request, response) {
      response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.ROUTE_NOT_FOUND,
      });
    }
}