import BLManager from './manager'
import { httpConstants } from '../../common/constants'

export default class JobController {

  static async updateDailyActiveNodes () {
    await BLManager.updateDailyActiveNodes().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }

  static async updateUpTime () {
    await BLManager.updateUpTime().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }

  static async getGasPrice () {
    await BLManager.getGasPrice().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }

  static async updateCountry () {
    await BLManager.updateCountry().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }

  static async getEthPrice () {
    await BLManager.getEthPrice().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }
}
