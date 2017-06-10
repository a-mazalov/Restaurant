cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-qrscanner.QRScanner",
        "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
        "pluginId": "cordova-plugin-qrscanner",
        "clobbers": [
            "QRScanner"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-fcm.FCMPlugin",
        "file": "plugins/cordova-plugin-fcm/www/FCMPlugin.js",
        "pluginId": "cordova-plugin-fcm",
        "clobbers": [
            "FCMPlugin"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-local-notifications-mm.LocalNotification",
        "file": "plugins/cordova-plugin-local-notifications-mm/www/local-notification.js",
        "pluginId": "cordova-plugin-local-notifications-mm",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "id": "cordova-plugin-local-notifications-mm.LocalNotification.Core",
        "file": "plugins/cordova-plugin-local-notifications-mm/www/local-notification-core.js",
        "pluginId": "cordova-plugin-local-notifications-mm",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "cordova-plugin-local-notifications-mm.LocalNotification.Util",
        "file": "plugins/cordova-plugin-local-notifications-mm/www/local-notification-util.js",
        "pluginId": "cordova-plugin-local-notifications-mm",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-qrscanner": "2.5.0",
    "cordova-plugin-splashscreen": "4.0.2",
    "cordova-plugin-crosswalk-webview": "2.3.0",
    "cordova-plugin-fcm": "2.1.1",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-app-event": "1.2.0",
    "cordova-plugin-local-notifications-mm": "1.0.5",
    "cordova-plugin-network-information": "1.3.3"
};
// BOTTOM OF METADATA
});