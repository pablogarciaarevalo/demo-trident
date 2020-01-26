#!/bin/bash

clear
echo "[root@rhel3 ~]# cat k8s_files/pv-alpine-nas1.yaml"
cat k8s_files/pv-alpine-nas1.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat k8s_files/pv-alpine-san1.yaml"
cat k8s_files/pv-alpine-san1.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/pv-alpine-nas1.yaml"
kubectl apply -f k8s_files/pv-alpine-nas1.yaml
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/pv-alpine-san1.yaml"
kubectl apply -f k8s_files/pv-alpine-san1.yaml
echo ""
echo "[root@rhel3 ~]# kubectl get pods"
kubectl get pods
