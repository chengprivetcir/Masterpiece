cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/de.appplant.cordova.plugin.printer/www/printer.js",
        "id": "de.appplant.cordova.plugin.printer.Printer",
        "clobbers": [
            "plugin.printer",
            "cordova.plugins.printer"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugin.statusbar/www/statusbar.js",
        "id": "com.phonegap.plugin.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugin.print/www/printPlugin.js",
        "id": "com.phonegap.plugin.print.printPlugin",
        "clobbers": [
            "navigator.printer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "de.appplant.cordova.plugin.printer": "0.7.1",
    "com.phonegap.plugin.statusbar": "1.1.0",
    "com.phonegap.plugin.print": "0.0.1"
}
// BOTTOM OF METADATA
});