---
title: "Grabbing current load and processes/services"
date: 2021-08-12T09:25:25-07:00
draft: true
---

```

// https://systeminformation.io/

const si = require('systeminformation');

(async function currentLPSInformation() {
    try {

        const curLoadData = await si.currentLoad();
        console.log(`Average Load: ${curLoadData.avgLoad}`);
        console.log(`CPU Load (%): ${curLoadData.currentLoad}`);
        console.log(`CPU Load User (%): ${curLoadData.currentLoadUser}`);
        console.log(`CPU Load System (%): ${curLoadData.currentLoadSystem}`);
        console.log(`CPU Load Nice (%): ${curLoadData.currentLoadNice}`);
        console.log(`CPU Load Idle (%): ${curLoadData.currentLoadIdle}`);
        console.log(`CPU Load IRQ (%): ${curLoadData.currentLoadIrq}`);
        console.log(`Raw CPU Load (ticks): ${curLoadData.rawCurrentLoad}`);
        console.log(`Raw CPU Load Idle (ticks): ${curLoadData.rawCurrentLoadIdle}`);
        console.log(`Raw CPU Load IRQ (ticks): ${curLoadData.rawCurrentLoadIrq}`);
        console.log(`Raw CPU Load Nice (ticks): ${curLoadData.rawCurrentLoadNice}`);
        console.log(`Raw CPU Load System (ticks): ${curLoadData.rawCurrentLoadSystem}`);
        console.log(`Raw CPU Load User (ticks): ${curLoadData.rawCurrentLoadUser}`);

        curLoadData.cpus.forEach((cpu, idx) => {
            console.log(`CPU ${idx + 1}: ${JSON.stringify(cpu)}`);
        });

        console.log("=========================================================");

        const fullLoad = await si.fullLoad();
        console.log(`Full Load: ${fullLoad}`)
        console.log("=========================================================");
        
        const processData = await si.processes();
        console.log(`# of processes: ${processData.all}`);
        console.log(`# of processes running: ${processData.running}`);
        console.log(`# of processes blocked: ${processData.blocked}`);
        console.log(`# of processes sleeping: ${processData.sleeping}`);
        console.log(`# of processes unknown status: ${processData.unknown}`);
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");

        const processList = processData.list;

        for(let idx = 0; idx < processList.length; idx++) {
            console.log(`Process PID [${idx}]: ${processList[idx].pid}`);
            console.log(`Process Parent ID [${idx}]: ${processList[idx].parentPid}`);
            console.log(`Process Name [${idx}]: ${processList[idx].name}`);
            console.log(`Process % CPU usage [${idx}]: ${processList[idx].cpu}`);
            console.log(`Process % CPU usage (user) [${idx}]: ${processList[idx].cpuu}`);
            console.log(`Process % CPU usage (system) [${idx}]: ${processList[idx].cpus}`);
            console.log(`Process Memory % [${idx}]: ${processList[idx].pmem}`);
            console.log(`Process Priority [${idx}]: ${processList[idx].priority}`);
            console.log(`Process Virtual Memory Size [${idx}]: ${processList[idx].memVsz}`);
            console.log(`Process Mem Resident Set Size [${idx}]: ${processList[idx].memRss}`);
            console.log(`Process Nice Value [${idx}]: ${processList[idx].nice}`);
            console.log(`Process Started [${idx}]: ${processList[idx].started}`);
            console.log(`Process State [${idx}]: ${processList[idx].state}`);
            console.log(`TTY from which process was started [${idx}]: ${processList[idx].tty}`);
            console.log(`User who started process [${idx}]: ${processList[idx].user}`);
            console.log(`Process Starting Command [${idx}]: ${processList[idx].command}`);
            console.log(`Process Params [${idx}]: ${processList[idx].params}`);
            console.log(`Process Path [${idx}]: ${processList[idx].path}`);
            console.log("************************************************");
        }
 
        console.log("=========================================================");

        const serviceData = await si.services('*');

        for(let idx = 0; idx < serviceData.length; idx++) {
            console.log(`Service Name [${idx}]: ${serviceData[idx].name}`);
            console.log(`Is Running [${idx}]: ${serviceData[idx].running}`);
            console.log(`Start Mode [${idx}]: ${serviceData[idx].startmode}`);
            console.log(`PIDS [${idx}]: ${serviceData[idx].pids}`);
            console.log(`Process % CPU [${idx}]: ${serviceData[idx].cpu}`);
            console.log(`Process % MEM [${idx}]: ${serviceData[idx].mem}`);
            console.log("************************************************");
        }

        console.log("=========================================================");
        
        const processLoadData = await si.processLoad('*');

        for(let idx = 0; idx < processLoadData.length; idx++) {
            console.log(`Process Name [${idx}]: ${processLoadData[idx].proc}`);
            console.log(`PIDS [${idx}]: ${processLoadData[idx].pids}`);
            console.log(`Process % CPU [${idx}]: ${processLoadData[idx].cpu}`);
            console.log(`Process % MEM [${idx}]: ${processLoadData[idx].mem}`);
            console.log("************************************************");
        }

    } catch(e) {
        console.log(e);
    }
})();


```
