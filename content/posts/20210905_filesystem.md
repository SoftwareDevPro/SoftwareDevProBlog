---
title: "Grabbing filesystem information"
date: 2021-08-12T09:25:37-07:00
draft: true
---

```

// https://systeminformation.io/

const si = require('systeminformation');

(async function filesystemInformation() {
    try {

        const diskLayouts = await si.diskLayout();
        console.log("Disk Layouts");
        console.log("=========================================================");

        for(let idx = 0; idx < diskLayouts.length; idx++) {
            console.log(`Device [${idx}]: ${diskLayouts[idx].device}`);
            console.log(`Type [${idx}]: ${diskLayouts[idx].type}`);
            console.log(`Name [${idx}]: ${diskLayouts[idx].name}`);
            console.log(`Vendor [${idx}]: ${diskLayouts[idx].vendor}`);
            console.log(`Size (in bytes) [${idx}]: ${diskLayouts[idx].size}`);
            console.log(`Bytes / Sector [${idx}]: ${diskLayouts[idx].bytesPerSector}`);
            console.log(`Total Cylinders [${idx}]: ${diskLayouts[idx].totalCylinders}`);
            console.log(`Total Heads [${idx}]: ${diskLayouts[idx].totalHeads}`);
            console.log(`Total Sectors [${idx}]: ${diskLayouts[idx].totalSectors}`);
            console.log(`Total Tracks [${idx}]: ${diskLayouts[idx].totalTracks}`);
            console.log(`Tracks / Cylinder [${idx}]: ${diskLayouts[idx].tracksPerCylinder}`);
            console.log(`Sectors / Track [${idx}]: ${diskLayouts[idx].sectorsPerTrack}`);
            console.log(`Firmware Revision [${idx}]: ${diskLayouts[idx].firmwareRevision}`);
            console.log(`Serial # [${idx}]: ${diskLayouts[idx].serialNum}`);
            console.log(`Interface Type [${idx}]: ${diskLayouts[idx].interfaceType}`);
            console.log(`S.M.A.R.T. Status [${idx}]: ${diskLayouts[idx].smartStatus}`);
            console.log(`S.M.A.R.T. Temperature [${idx}]: ${diskLayouts[idx].temperature}`);
            console.log(`Full S.M.A.R.T. data from SmartCtl [${idx}]: ${diskLayouts[idx].smartData}`);
            console.log("************************************************");
        }

        const blockDevices = await si.blockDevices();
        console.log("Block Devices");
        console.log("=========================================================");

        for(let idx = 0; idx < blockDevices.length; idx++) {
            console.log(`Name [${idx}]: ${blockDevices[idx].name}`);
            console.log(`Type [${idx}]: ${blockDevices[idx].type}`);
            console.log(`File System Type [${idx}]: ${blockDevices[idx].fsType}`);
            console.log(`Mount Point [${idx}]: ${blockDevices[idx].mount}`);
            console.log(`Size (in bytes) [${idx}]: ${blockDevices[idx].size}`);
            console.log(`Physical Type [${idx}]: ${blockDevices[idx].physical}`);
            console.log(`UUID [${idx}]: ${blockDevices[idx].uuid}`);
            console.log(`Label [${idx}]: ${blockDevices[idx].label}`);
            console.log(`Model [${idx}]: ${blockDevices[idx].model}`);
            console.log(`Serial # [${idx}]: ${blockDevices[idx].serial}`);
            console.log(`Removable [${idx}]: ${blockDevices[idx].removable}`);
            console.log(`Protocol [${idx}]: ${blockDevices[idx].protocol}`);
            console.log("************************************************");
        }

        const diskIo = await si.disksIO();
        if (diskIo !== null) {
            console.log("Transfer Rates");
            console.log("=========================================================");
            console.log(`Read IOs (on all mounted drives): ${diskIo.rIO}`);
            console.log(`Write IOs (on all mounted drives): ${diskIo.wIO}`);
            console.log(`Total IOs (on all mounted drives): ${diskIo.tIO}`);
            console.log(`Read IO / sec: ${diskIo.rIO_sec}`);
            console.log(`Write IO / sec: ${diskIo.wIO_sec}`);
            console.log(`Total IO / sec: ${diskIo.tIO_sec}`);
            console.log(`Interval Length (for per/sec values): ${diskIo.ms}`);    
        }

        const mountedFs = await si.fsSize();
        console.log("Mounted File Systems");
        console.log("=========================================================");
        for(let idx = 0; idx < mountedFs.length; idx++) {
            console.log(`Filesystem Name [${idx}]: ${mountedFs[idx].fs}`);
            console.log(`Filesystem Type [${idx}]: ${mountedFs[idx].type}`);
            console.log(`Size (bytes) [${idx}]: ${mountedFs[idx].size}`);
            console.log(`Used (bytes) [${idx}]: ${mountedFs[idx].used}`);
            console.log(`Available (bytes) [${idx}]: ${mountedFs[idx].available}`);
            console.log(`Used % [${idx}]: ${mountedFs[idx].use}`);
            console.log(`Mount Point [${idx}]: ${mountedFs[idx].mount}`);
            console.log("************************************************");
        }

        const openFiles = await si.fsOpenFiles();
        if (openFiles !== null) {
            console.log("Count Max/Allocated File Descriptors");
            console.log("=========================================================");
            console.log(`Max File Descriptors: ${openFiles.max}`);
            console.log(`Current Open Files Count: ${openFiles.allocated}`);
            console.log(`Count Available: ${openFiles.available}`);    
        }

        const fsStats = await si.fsStats();
        if (fsStats !== null) {
            console.log("Current Transfer Rates");
            console.log("=========================================================");
            console.log(`Bytes read since startup: ${fsStats.rx}`);
            console.log(`Bytes written since startup: ${fsStats.wx}`);
            console.log(`Total bytes since startup: ${fsStats.tx}`);
            console.log(`Bytes read/second: ${fsStats.rx_sec}`);
            console.log(`Bytes written/second: ${fsStats.wx_sec}`);
            console.log(`Total bytes: ${fsStats.tx_sec}`);
            console.log(`Interval Length (per sec/values): ${fsStats.ms}`);    
        }

    } catch(e) {
        console.log(e);
    }
})();
```

