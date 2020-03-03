#!/bin/bash

clear
echo "[root@rhel3 ~]# wget https://github.com/NetApp/trident/releases/download/v20.01.1/trident-installer-20.01.1.tar.gz"
wget https://github.com/NetApp/trident/releases/download/v20.01.1/trident-installer-20.01.1.tar.gz
echo "[root@rhel3 ~]# tar -xf trident-installer-20.01.1.tar.gz"
tar -xf trident-installer-20.01.1.tar.gz
echo "[root@rhel3 ~]# cd trident-installer"
cd trident-installer
echo "[root@rhel3 ~]# ./tridentctl install -n trident"
./tridentctl install -n trident
