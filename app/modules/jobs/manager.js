export default class BLManager {
  static async updateDailyActiveNodes () {
    let currentTime = new Date().getTime();
    let pastTime = new Date(new Date().setDate(new Date().getDate() - 7)).getTime()
    console.log(currentTime);
    console.log(pastTime);
    return true
  }
  
}
