#!/bin/bash

clear
echo "[root@rhel3 ~]# cat ansible_files/day0-1.yaml"
cat ansible_files/day0-1.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo ""
echo "[root@rhel3 ~]# ansible-playbook ansible_files/day0-1.yaml"
ansible-playbook ansible_files/day0-1.yaml

