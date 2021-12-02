import BLManager from './manager'
import { httpConstants } from '../../common/constants'

export default class JobController {

  static async updateDailyActiveNodes () {
    await BLManager.updateDailyActiveNodes().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }
}
