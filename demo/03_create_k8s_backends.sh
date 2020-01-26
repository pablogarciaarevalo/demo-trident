#!/bin/bash

clear
echo "[root@rhel3 ~]# cat k8s_files/backend-san.json"
cat k8s_files/backend-san.json
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat k8s_files/backend-nas.json"
cat k8s_files/backend-nas.json
echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# tridentctl create backend --filename ../demo/k8s_files/backend-nas.json -n trident"
tridentctl create backend --filename ../demo/k8s_files/backend-nas.json -n trident
echo "[root@rhel3 ~]# tridentctl create backend --filename ../demo/k8s_files/backend-san.json -n trident"
tridentctl create backend --filename ../demo/k8s_files/backend-san.json -n trident
echo ""

echo "[root@rhel3 ~]# tridentctl get backends -n trident"
tridentctl get backends -n trident
