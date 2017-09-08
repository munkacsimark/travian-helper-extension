## travian-helper-extension
A [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) which makes the game comfortable.

⚠️The extension is under development, it's instable and untested.

Use it at your own risk, you can be banned from server! [Rules](http://t4.answers.travian.com/?aid=103#bot).

Currently working parts:
- **auto reload** so we can detect logout or attack (it selects random time between 2 and 5 mins).
- **auto login**, when the game logs out. (currently it requires a `credentials.js` file with name and password because of [this](https://bugs.chromium.org/p/chromium/issues/detail?id=378419) issue).
- **detect attack** in background. The browser will send you a notification which requires interaction, and a siren sound will be played. 🚨
- **hide unnecessary stuffs** like boxes and icons which you can use only with gold.

Feel free to [contribute](https://github.com/munkacsimark/travian-helper-extension/blob/master/CONTRIBUTING.md) or [open issues](https://github.com/munkacsimark/travian-helper-extension/issues). ✊
