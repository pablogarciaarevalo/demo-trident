#!/bin/bash

clear
echo "[root@rhel3 ~]# cat ansible_files/day2.yaml"
cat ansible_files/day2.yaml
read -p "Press any key to continue... " -n1 -s
echo ""
echo "[root@rhel3 ~]# cat volume-name-snapmirror.json"
cat volume-name-snapmirror.json
echo ""
echo "[root@rhel3 ~]# ansible-playbook ansible_files/day2.yaml-e \"@volume-name-snapmirror.json\""
ansible-playbook ansible_files/day2.yaml -e "@volume-name-snapmirror.json"


