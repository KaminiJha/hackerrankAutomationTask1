const { TIMEOUT } = require('dns');
const puppy=require('puppeteer');
async function openBrowser()
{
    const browser=await puppy.launch({
        headless:false,
        defaultViewport:false,
        args:[
            '--start-maximized'
        ],
    });
    // browser.pages().then(function(tabs)
    // {
    //     tabs[0].goto("https://www.google.com")
    // })
    // for(let i=0;i<10;i++)
    // {
    //     //here we have not used await toh koi time waste nhi hoga u can doevertything parallely
    //     browser.newPage().then(function(tab)
    //     {
    //         tab.goto("https://www.google.com")
    //     })
    //     // (await (await browser).newPage()).goto("https://www.google.com");

    // }
    const tabs=await browser.pages();
    const tab=tabs[0]
    await tab.goto("https://www.hackerrank.com/auth/login");
    //$->quryselector
    //$$->querySelectorAll
    //-----login steps
    let username=await tab.$("#input-1");
    let password=await tab.$("#input-2");
    let remMe=await tab.$(".checkbox-input");
    let loginBtn=await tab.$('[data-analytics="LoginPassword"]')
    await username.type("kamini123skt@gmail.com");
    await password.type("kamini@1")
    await remMe.click()
    await loginBtn.click()

    await tab.waitForNavigation()
    await tab.waitForTimeout(2000)

    //click on user icon   
    await tab.click('div[data-analytics="NavBarProfileDropDown"]')
    await tab.waitForTimeout(2000)
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]')

    // await tab.waitForNavigation()
    await tab.waitForTimeout(3000)

    //opening administration screen
    let challenges=await tab.$("#content>div>div>div>section>header>ul>li:nth-child(2)>a")
   await challenges.click();
   await tab.waitForTimeout(2000)

   //selecting frst challenge and clicking on it
   let selectChallenge1=await tab.$('#content>div>div>div>section>div.table-wrap.mlT>div>a')
   await selectChallenge1.click()
   await tab.waitForTimeout(2000);

   //selecting moderators
   let selectModerators=await tab.$('#content>div>section>header>div>div.tabs-cta-wrapper>ul>li:nth-child(2)')
   await selectModerators.click()
   console.log("moderators reached!!!")








    // await tab.waitForNavigation()
    // console.log("navigated")
    // console.log("wait kra and selected")
    // await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]')
    // console.log("click kra")
    // await tab.waitForNavigation()
    // await tab.click("a[href='/administration/challenges']")
    // await tab.waitForNavigation()
    // await tab.click('a')
    
    
}
openBrowser()