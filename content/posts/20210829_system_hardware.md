---
title: "Grabbing system hardware information"
date: 2021-08-11T12:23:54-07:00
draft: true
---

```

// https://systeminformation.io/

const si = require('systeminformation');

(async function hardwareInformation() {
    try {
        const hwData = await si.system();
        
        console.log("Hardware Information:")
        console.log(`Manufacturer: ${hwData.manufacturer}`);
        console.log(`Model: ${hwData.model}`);
        console.log(`Version: ${hwData.version}`);
        console.log(`Serial Number:${hwData.serial}`);
        console.log(`UUID: ${hwData.uuid}`);
        console.log(`SKU Number: ${hwData.sku}`);
        console.log(`Is virtual?: ${hwData.virtual}`);
        console.log(`Virtual Host: ${hwData.virtualHost}`);
        console.log(`Optional Raspberry Revision Data: ${hwData.raspberry}`);
        console.log("=========================================================");

        const biosData = await si.bios();
        
        console.log("BIOS Information:")
        console.log(`Vendor: ${biosData.vendor}`);
        console.log(`Version: ${biosData.version}`);
        console.log(`Release Date: ${biosData.releaseDate}`);
        console.log(`Revision: ${biosData.revision}`);
        console.log("=========================================================");

        const baseboardData = await si.baseboard();

        console.log(`Manufacturer:${baseboardData.manufacturer}`);
        console.log(`Model/Product Name:${baseboardData.model}`);
        console.log(`Version:${baseboardData.version}`);
        console.log(`Serial #:${baseboardData.serial}`);
        console.log(`Asset Tag:${baseboardData.assetTag}`);
        console.log(`Max Memory (bytes):${baseboardData.memMax}`);
        console.log(`Memory Slots on baseboard:${baseboardData.memSlots}`);
        console.log("=========================================================");

        const chassisData = await si.chassis();

        console.log("Chassis Information:")
        console.log(`Manufacturer: ${chassisData.manufacturer}`);
        console.log(`Model: ${chassisData.model}`);
        console.log(`Type: ${chassisData.type}`);
        console.log(`Version: ${chassisData.version}`);
        console.log(`Serial Number: ${chassisData.serial}`);
        console.log(`Asset Tag: ${chassisData.assetTag}`);
        console.log(`SKU number: ${chassisData.sku}`);

    } catch(e) {
        console.log(e);
    }
})();

```
