const checkNewUsers = require('./utils/checkNewUsers');
const getTotalUsers = require('./utils/getTotalUsers');
const scrollDown = require('./utils/scrollDown');
const getInfo = require('./getInfo');
const switchNextTab = require('./utils/switchNextTab');

/**
 * @function getProfileLink get link profile from landing dribble and open in new tab
 * @param {Object} driver
 */
async function getProfileLink(driver, count = 0) {
  console.log('Get Profile Link is LOADING ...');

  console.log('--- --- --- Get Profile Link --- --- ---');

  // if (count !== 0) {
  if (true) {
    await scrollDown(driver);
    await checkNewUsers(driver, count);
  }

  const $userLinks = await getTotalUsers(driver);
  const countUsers = $userLinks.length;

  for (let i = count; i < countUsers; i++) {
    const link = $userLinks[i];
    const href = await link.getAttribute('href');
    // open info user links in new tabs
    driver.executeScript(`window.open('${href}/about', '${i}');`);
  }

  await switchNextTab(driver);

  await getInfo(driver, getProfileLink, countUsers);
}

module.exports = getProfileLink;
