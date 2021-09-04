---
title: "Grabbing operating system information"
date: 2021-08-12T09:25:01-07:00
draft: true
---

```


// https://systeminformation.io/

const si = require('systeminformation');

(async function osInformation() {
    try {

        const osData = await si.osInfo();
        console.log(`Platform: ${osData.platform}`);
        console.log(`Distro: ${osData.distro}`);
        console.log(`Release: ${osData.release}`);
        console.log(`Codename: ${osData.codename}`);
        console.log(`Kernel: ${osData.kernel}`);
        console.log(`Arch: ${osData.arch}`);
        console.log(`Hostname: ${osData.hostname}`);
        console.log(`FQDN (fully qualified domain name): ${osData.fqdn}`);
        console.log(`Codepage (os build version): ${osData.codepage}`);
        console.log(`Logofile: ${osData.logofile}`);
        console.log(`Serial: ${osData.serial}`);
        console.log(`Build: ${osData.build}`);
        console.log(`Service Pack: ${osData.servicepack}`);
        console.log(`UEFI: ${osData.uefi}`);
        console.log(`Hypervisor: ${osData.hypervizor}`);
        console.log(`Remote Session: ${osData.remoteSession}`);
        console.log("=========================================================");

        const uuidData = await si.uuid();
        console.log(`OS Specific UUID: ${uuidData.os}`);
        console.log(`Hardware Specific UUID: ${uuidData.hardware}`);
        console.log(`MAC addresses: ${uuidData.macs}`);
        console.log("=========================================================");
        
        const versionsData = await si.versions();
        console.log(`Versions Data: ${JSON.stringify(versionsData)}`);
        console.log("=========================================================");

        const shellData = await si.shell();
        console.log(`Shell: ${shellData}`);
        console.log("=========================================================");

        const userData = await si.users();

        for(let idx = 0; idx < userData.length; idx++) {
            console.log(`User Name [${idx + 1}: ${userData[idx].user}`);
            console.log(`Terminal [${idx + 1}: ${userData[idx].tty}`);
            console.log(`Login Date [${idx + 1}: ${userData[idx].date}`);
            console.log(`Login Time [${idx + 1}: ${userData[idx].time}`);
            console.log(`IP Address (remote login) [${idx + 1}: ${userData[idx].ip}`);
            console.log(`Last Command/Shell [${idx + 1}: ${userData[idx].command}`);
        }

    } catch(e) {
        console.log(e);
    }
})();

```
