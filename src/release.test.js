/**
 * @class Jenkins Build
 * @description 定時觸發 LAB 區 Jenkins 推版，版次窗口必備良藥
 **/
import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
import { delay } from './utils/Utils.js'
import { browserConfig, TIMEOUT } from '../config/app.config'
dotenv.config()
const { Branch, DelayTime, JenkinsURL, UserName, Password } = process.env
const element = {
    loginBtn: '.login a',
    userNameInput: '#j_username',
    passwordInput: 'input[type=password]',
    confirmBtn: '#yui-gen1-button',
    BuildWithParameters: '#tasks > div:nth-child(4) > a.task-link',
    branchSelect: '#select'
}
beforeAll(async () => {
    const MAX = 10
    const time = Math.min(MAX, Math.abs(DelayTime))
    await delay(time)
})
describe('Jenkins Build', () => {
    let browser
    let page
    beforeAll(async () => {
        browser = await puppeteer.launch(browserConfig)
        page = await browser.newPage()
    })
    afterAll(async () => {
        await browser.close()
    })
    test(
        'Go to Jenkins',
        async () => {
            await page.goto(JenkinsURL)
        },
        TIMEOUT
    )
    test(
        'Login',
        async () => {
            await page.waitForSelector(element.loginBtn)
            await page.click(element.loginBtn)
            await page.waitForSelector(element.userNameInput)
            await page.type(element.userNameInput, UserName)
            await page.type(element.passwordInput, Password)
            await page.waitForSelector(element.confirmBtn)
            await page.click(element.confirmBtn)
            await page.waitForNavigation()
        },
        TIMEOUT
    )
    test(
        'Trigger Jenkins Build',
        async () => {
            await page.waitForSelector(element.BuildWithParameters)
            await page.click(element.BuildWithParameters)
            await page.select(element.branchSelect, Branch)
            await page.click(element.confirmBtn)
        },
        TIMEOUT
    )
})
