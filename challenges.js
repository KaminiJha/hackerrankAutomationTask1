const puppy = require("puppeteer");

let moderators = ["bansalbhavesh47", "bansalbhavesh50"];

async function openBrowser(url) {
  const browser = await puppy.launch({
    headless: false,
    defaultViewport: false,
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ]
  });
  // browser.pages().then(function(tabs) {
  //     tabs[0].goto("https://www.google.com");
  // })
  // for(let i = 0; i < 9; i++) {
  //     browser.newPage().then(function(tab) {
  //         tab.goto("https://www.google.com");
  //     })
  // }

  const tabs = await browser.pages();
  const tab = tabs[0];
  await tab.goto("https://www.hackerrank.com/auth/login");
  //filing login details
  let usernameInputTab = await tab.$("#input-1");
  let passwordInputTab = await tab.$("#input-2");
  let rememberCheckbox = await tab.$(".checkbox-input");
  let loginButton = await tab.$('[data-analytics="LoginPassword"]');
  await usernameInputTab.type("kamini123skt@gmail.com");
  await passwordInputTab.type("kamini@1");
  await rememberCheckbox.click();
  await loginButton.click();
  //navigating to other window
  await tab.waitForNavigation({ waitUntil: "networkidle2" });
  //click dropdown and select administration
  await tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]', {
    visible: true,
  });
  let myProfileButton = await tab.$('[data-analytics="NavBarProfileDropDown"]');
  await myProfileButton.click();
  let administrationButton = await tab.$(
    '[data-analytics="NavBarProfileDropDownAdministration"]'
  );
  await administrationButton.click();

  await tab.waitForNavigation({waitUntil:"networkidle2"})
  //manage challenge click
  await tab.waitForSelector(".admin-tabbed-nav a");
  let administrationTabs = await tab.$$(".admin-tabbed-nav a");
  await administrationTabs[1].click();
  //click create and create challnge
  await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
  let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
  await createChallengeButton.click();
  await tab.waitForSelector("#input_format-container .CodeMirror-code");
  let challengeNameInput = await tab.$("#name");
  let challengeDescriptionInput = await tab.$("#preview");
  await challengeNameInput.type("kjdsbf");
  await challengeDescriptionInput.type("kjdsbf");
  await tab.waitForSelector(".CodeMirror-code");
  let codeTextAreas = await tab.$$(".CodeMirror-code");
await tab.evaluate( () => {
    window.scrollBy(0, window.innerHeight);
});
for(let i in codeTextAreas) {
        await codeTextAreas[i].click();
        await codeTextAreas[i].type("kjdsbf");
}
await codeTextAreas[1].click();
await codeTextAreas[1].type("jbcbbwc");
//adding tags
await tab.waitForSelector("#tags_tagsinput");
let tagsTextArea = await tab.$("#tags_tagsinput");
await tagsTextArea.click();
await tagsTextArea.type("kjdsbf");
await tab.keyboard.press("Enter");
//save challenge
let saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
await saveChangesButton.click();
//adding moderators
await tab.waitForSelector('[data-tab="moderators"]');
let moderatorButton = await tab.$('[data-tab="moderators"]');
await moderatorButton.click();

await tab.waitForSelector("#moderator")
let moderatorTextArea = await tab.$("#moderator");
for(let moderator of moderators) {
    await moderatorTextArea.type(moderator);
    await tab.keyboard.press("Enter");
}
//scroll 
await tab.evaluate( () => {
  window.scrollTo(0,window.document.body.scrollHeight);
});
//saving challenge
await tab.waitForSelector(".save-challenge.btn.btn-green");
let saveButton = await tab.$(".save-challenge.btn.btn-green");
console.log("clci")
await saveButton.click();
}
openBrowser("https://www.google.com");