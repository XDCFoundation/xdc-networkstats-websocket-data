import Utils from '../../utils'
import { apiSuccessMessage, httpConstants } from '../../common/constants'
import BLManager from './manger'

export default class Index {

  async addNode (request, response) {
    lhtWebLog('Inside addNode', request.body, 'addNode', 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().addNode(request.body))
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }

  async getNode (request, response) {
    lhtWebLog('Inside getNode', request.body, 'getNode', 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().getNode(request.query))
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }

  async testSocket (request, response) {
    lhtWebLog('Inside testSocket', request.body, 'testSocket', 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().testSocket(request.query))
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }
}
