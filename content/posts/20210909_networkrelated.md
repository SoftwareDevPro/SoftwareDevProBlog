---
title: "Grabbing network related functions"
date: 2021-08-12T09:26:20-07:00
draft: true
---

```

// https://systeminformation.io/

const si = require('systeminformation');

(async function networkInformation() {
    try {

        console.log("Network Interfaces: ");
        console.log("=========================================================");
        const nifaces = await si.networkInterfaces();

        for(let idx = 0; idx < nifaces.length; idx++) {
            console.log(`Interface [${idx}]: ${nifaces[idx].iface}`);
            console.log(`Interface Name [${idx}]: ${nifaces[idx].ifaceName}`);
            console.log(`IP4 address [${idx}]: ${nifaces[idx].ip4}`);
            console.log(`IP4 Subnet mask [${idx}]: ${nifaces[idx].ip4subnet}`);
            console.log(`IP6 address [${idx}]: ${nifaces[idx].ip6}`);
            console.log(`IP6 Subnet mask [${idx}]: ${nifaces[idx].ip6subnet}`);
            console.log(`MAC Address [${idx}]: ${nifaces[idx].mac}`);
            console.log(`Is internal address [${idx}]: ${nifaces[idx].internal}`);
            console.log(`Is virtual address [${idx}]: ${nifaces[idx].virtual}`);
            console.log(`Up/Down [${idx}]: ${nifaces[idx].operstate}`);
            console.log(`Wireless/Wired [${idx}]: ${nifaces[idx].type}`);
            console.log(`Duplex [${idx}]: ${nifaces[idx].duplex}`);
            console.log(`Maximum Tranmission Unit [${idx}]: ${nifaces[idx].mtu}`);
            console.log(`Speed in Mbit/s [${idx}]: ${nifaces[idx].speed}`);
            console.log(`IP obtained by DHCP [${idx}]: ${nifaces[idx].dhcp}`);
            console.log(`DNS Suffix [${idx}]: ${nifaces[idx].dnsSuffix}`);
            console.log(`IEEE 802.1x auth [${idx}]: ${nifaces[idx].ieee8021xAuth}`);
            console.log(`IEEE 802.1x state [${idx}]: ${nifaces[idx].ieee8021xState}`);
            console.log(`Changes Up/Down [${idx}]: ${nifaces[idx].carrierChanges}`);
            console.log("=========================================================");
        }

        const defaultNetworkIface = await si.networkInterfaceDefault();
        console.log(`Default Network Interface: ${defaultNetworkIface}`);
        console.log("=========================================================");

        const networkGatewayDefault = await si.networkGatewayDefault();
        console.log(`Network Gateway Default: ${networkGatewayDefault}`);
        console.log("=========================================================");

        const networkStats = await si.networkStats('*');
        console.log("Network Stats: ");
        console.log("=========================================================");
        for(let idx = 0; idx < networkStats.length; idx++) {
            console.log(`Interface [${idx}]: ${networkStats[idx].iface}`);
            console.log(`Up/Down [${idx}]: ${networkStats[idx].operstate}`);
            console.log(`Received bytes [${idx}]: ${networkStats[idx].rx_bytes}`);
            console.log(`Received dropped [${idx}]: ${networkStats[idx].rx_dropped}`);
            console.log(`Received errors [${idx}]: ${networkStats[idx].rx_errors}`);
            console.log(`Transferred bytes [${idx}]: ${networkStats[idx].tx_bytes}`);
            console.log(`Transferred dropped [${idx}]: ${networkStats[idx].tx_dropped}`);
            console.log(`Transferred errors [${idx}]: ${networkStats[idx].tx_errors}`);
            console.log(`Received Bytes/Sec [${idx}]: ${networkStats[idx].rx_sec}`);
            console.log(`Transferred Bytes/Sec [${idx}]: ${networkStats[idx].tx_sec}`);
            console.log(`Interval Length (for per/sec values) [${idx}]: ${networkStats[idx].ms}`);
            console.log("************************************************");
        }

        const networkConns = await si.networkConnections();
        console.log("Current Network Connections: ");
        console.log("=========================================================");
        for(let idx = 0; idx < networkStats.length; idx++) {
            console.log(`Protocol [${idx}]: ${networkConns[idx].protocol}`);
            console.log(`Local Address [${idx}]: ${networkConns[idx].localAddress}`);
            console.log(`Local Port [${idx}]: ${networkConns[idx].localPort}`);
            console.log(`Peer Address [${idx}]: ${networkConns[idx].peerAddress}`);
            console.log(`Peer Port [${idx}]: ${networkConns[idx].peerPort}`);
            console.log(`State [${idx}]: ${networkConns[idx].state}`);
            console.log(`Process ID [${idx}]: ${networkConns[idx].pid}`);
            console.log(`Process Name [${idx}]: ${networkConns[idx].process}`);
            console.log("************************************************");
        }

        const inetChecksite = await si.inetChecksite('http://www.google.com');
        console.log("Response Time (ms) to fetch given URL (www.google.com): ");
        console.log("=========================================================");
        console.log(`Given URL : ${inetChecksite.url}`);
        console.log(`Status Code OK: ${inetChecksite.ok}`);
        console.log(`Status Code: ${inetChecksite.status}`);
        console.log(`Response Time (ms): ${inetChecksite.ms}`);

        const inetLatency = await si.inetLatency();
        console.log("Response-time (ms) to external resource: ");
        console.log("=========================================================");
        console.log(`Response Time (8.8.8.8): ${inetLatency}`)

    } catch(e) {
        console.log(e);
    }
})();

```
