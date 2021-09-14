---
title: "Grabbing virtual box information"
date: 2021-08-12T09:26:58-07:00
draft: true
---

```

// https://systeminformation.io/

const si = require('systeminformation');

(async function virtualBoxInformation() {
    try {

        const vboxInfoData = await si.vboxInfo();

        for(let idx = 0; idx < vboxInfoData.length; idx++) {
            console.log(`Virtual Box ID [${idx + 1}]: ${vboxInfoData[idx].id}`);
            console.log(`Name [${idx + 1}]: ${vboxInfoData[idx].name}`);
            console.log(`Running [${idx + 1}]: ${vboxInfoData[idx].running}`);
            console.log(`Started [${idx + 1}]: ${vboxInfoData[idx].started}`);
            console.log(`Running Since [${idx + 1}]: ${vboxInfoData[idx].runningSince}`);
            console.log(`Stopped [${idx + 1}]: ${vboxInfoData[idx].stopped}`);
            console.log(`Stopped Since [${idx + 1}]: ${vboxInfoData[idx].stoppedSince}`);
            console.log(`Guest OS [${idx + 1}]: ${vboxInfoData[idx].guestOS}`);
            console.log(`Hardware UUID [${idx + 1}]: ${vboxInfoData[idx].hardwareUUID}`);
            console.log(`Memory (Mb) [${idx + 1}]: ${vboxInfoData[idx].memory}`);
            console.log(`VRAM (Mb) [${idx + 1}]: ${vboxInfoData[idx].vram}`);
            console.log(`CPUs [${idx + 1}]: ${vboxInfoData[idx].cpus}`);
            console.log(`CPU exec cap [${idx + 1}]: ${vboxInfoData[idx].cpuExepCap}`);
            console.log(`CPU profile [${idx + 1}]: ${vboxInfoData[idx].cpuProfile}`);
            console.log(`Chipset [${idx + 1}]: ${vboxInfoData[idx].chipset}`);
            console.log(`Firmware [${idx + 1}]: ${vboxInfoData[idx].firmware}`);
            console.log(`Page Fusion [${idx + 1}]: ${vboxInfoData[idx].pageFusion}`);
            console.log(`Config File [${idx + 1}]: ${vboxInfoData[idx].configFile}`);
            console.log(`Snapshot Folder [${idx + 1}]: ${vboxInfoData[idx].snapshotFolder}`);
            console.log(`Log Folder [${idx + 1}]: ${vboxInfoData[idx].logFolder}`);
            console.log(`HPET [${idx + 1}]: ${vboxInfoData[idx].hpet}`);
            console.log(`PAE [${idx + 1}]: ${vboxInfoData[idx].pae}`);
            console.log(`Long Mode [${idx + 1}]: ${vboxInfoData[idx].longMode}`);
            console.log(`Triple Fault Reset [${idx + 1}]: ${vboxInfoData[idx].tripleFaultReset}`);
            console.log(`APIC [${idx + 1}]: ${vboxInfoData[idx].apic}`);
            console.log(`X2APIC [${idx + 1}]: ${vboxInfoData[idx].x2Apic}`);
            console.log(`ACPI [${idx + 1}]: ${vboxInfoData[idx].acpi}`);
            console.log(`IOAPIC [${idx + 1}]: ${vboxInfoData[idx].ioApic}`);
            console.log(`BIOS APIC mode [${idx + 1}]: ${vboxInfoData[idx].biosApicMode}`);
            console.log(`Boot Menu Mode [${idx + 1}]: ${vboxInfoData[idx].bootMenuMode}`);
            console.log(`Boot Device 1 [${idx + 1}]: ${vboxInfoData[idx].bootDevice1}`);
            console.log(`Boot Device 2 [${idx + 1}]: ${vboxInfoData[idx].bootDevice2}`);
            console.log(`Boot Device 3 [${idx + 1}]: ${vboxInfoData[idx].bootDevice3}`);
            console.log(`Boot Device 4 [${idx + 1}]: ${vboxInfoData[idx].bootDevice4}`);
            console.log(`Time Offset [${idx + 1}]: ${vboxInfoData[idx].timeOffset}`);
            console.log(`RTC [${idx + 1}]: ${vboxInfoData[idx].rtc}`);

            console.log("=========================================================");
        }

    } catch(e) {
        console.log(e);
    }
})();

```
