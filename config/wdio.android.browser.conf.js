const { config } = require("./wdio.base.conf");

config.capabilities = [{
    path: '/wd/hub',
    platformName: "Android",
    browserName: "Chrome",
    "appium:platformVersion": "11.0",
    "appium:deviceName": "Android Emulator",
    "appium:automationName": "UIAutomator2",
    maxInstances: 1,
}];

exports.config = config;