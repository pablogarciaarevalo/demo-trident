#!/bin/bash

clear
echo "[root@rhel3 ~]# wget https://github.com/NetApp/trident/releases/download/v19.10.0/trident-installer-19.10.0.tar.gz"
wget https://github.com/NetApp/trident/releases/download/v19.10.0/trident-installer-19.10.0.tar.gz
echo "[root@rhel3 ~]# tar -xf trident-installer-19.10.0.tar.gz"
tar -xf trident-installer-19.10.0.tar.gz
echo "[root@rhel3 ~]# cd trident-installer"
cd trident-installer
echo "[root@rhel3 ~]# ./tridentctl install -n trident"
./tridentctl install -n trident
