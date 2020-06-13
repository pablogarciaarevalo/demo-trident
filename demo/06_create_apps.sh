#!/bin/bash

clear
echo "[root@rhel3 ~]# cat k8s_files/hello-world-rwm.yaml"
cat k8s_files/hello-world-rwm.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat k8s_files/hello-world-rwo.yaml"
cat k8s_files/hello-world-rwo.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/hello-world-rwm.yaml"
kubectl apply -f k8s_files/hello-world-rwm.yaml
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/hello-world-rwo.yaml"
kubectl apply -f k8s_files/hello-world-rwo.yaml
echo ""
echo "[root@rhel3 ~]# kubectl get all"
kubectl get all
