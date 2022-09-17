{
    // Configure adv settings
    wappsto.configureWifi("ssid", "password");

    // Clean old data model
    wappsto.sendCleanToWappsto();

    // Configure Data model
    wappsto.configureName("MyBit");
    wappsto.configureValue(1, "Light Value", WappstoValueTemplate.Light);
    wappsto.configureNumberValue(2, "Test Value", "Test", 0, 100, 1, "none");
    wappsto.configureStringValue(16, "Test String Value", "Test");

    // Register event handlers
    wappsto.onNumberEvent(2, (num) => {
        basic.showNumber(num);
    });
    wappsto.onStringEvent(16, (str) => {
        basic.showString(str);
    });

    basic.showIcon(IconNames.No);

    // Wait for connecting
    while(!wappsto.connected()) {
        basic.pause(100);
    }
    basic.showIcon(IconNames.Yes);
    basic.pause(1000);

    // Send updates to Wappsto
    wappsto.sendNumberToWappsto(1, input.lightLevel(), WappstoTransmit.OnChange);
    wappsto.sendStringToWappsto("Hello From Wappsto:Bit", 16, WappstoTransmit.ASAP);

    if(wappsto.signalQuality() > 30) {
        basic.showString("Good signal");
    } else {
        basic.showString("Bad signal");
    }
    basic.pause(3000);

    basic.showString(wappsto.carrier());
    basic.pause(3000);

    basic.showNumber(wappsto.time());
    basic.pause(1000);
    basic.showNumber(wappsto.uptime());
}
