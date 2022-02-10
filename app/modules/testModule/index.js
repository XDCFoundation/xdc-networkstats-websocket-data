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

  async getUpTime (request, response) {
    lhtWebLog('Inside getUpTime',  'getUpTime', request.params, 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().getUpTime(request.params.day))
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }

  async getGasPrice (request, response) {
    lhtWebLog('Inside getGasPrice',  'getGasPrice', request.body, 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().getGasPrice())
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }

  async getInit (request, response) {
    lhtWebLog('Inside getNodesInit',  'getNodesInit', request.body, 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().getInit())
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }

  async getTableNodes (request, response) {
    lhtWebLog('Inside getTableNodes',  'getTableNodes', request.body, 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().getTableNodes())
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }

  async getEthPrice (request, response) {
    lhtWebLog('Inside getEthPrice',  'getEthPrice', request.body, 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().getEthPrice())
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }
}
