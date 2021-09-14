---
title: "Grabbing bluetooth information"
date: 2021-08-12T09:26:42-07:00
draft: true
---

```

// https://systeminformation.io/

const si = require('systeminformation');

(async function bluetoothInformation() {
    try {

        const btData = await si.bluetoothDevices();
        
        for(let idx = 0; idx < btData.length; idx++) {

            console.log(`Device Name [${idx + 1}]: ${btData[idx].device}`);
            console.log(`Name [${idx + 1}]: ${btData[idx].name}`);
            console.log(`MAC Address Device [${idx + 1}]: ${btData[idx].macDevice}`);
            console.log(`MAC Address Host [${idx + 1}]: ${btData[idx].macHost}`);
            console.log(`Battery Level % [${idx + 1}]: ${btData[idx].batteryPercent}`);
            console.log(`Manufacturer [${idx + 1}]: ${btData[idx].manufacturer}`);
            console.log(`Bluetooth Device Type [${idx + 1}]: ${btData[idx].type}`);
            console.log(`Is Connected [${idx + 1}]: ${btData[idx].connected}`);
            console.log("=========================================================");
        }

    } catch(e) {
        console.log(e);
    }
})();

```

