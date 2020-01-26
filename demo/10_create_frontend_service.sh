#!/bin/bash

clear
echo "[root@rhel3 ~]# cat k8s_files/frontend.yaml"
cat k8s_files/frontend.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/frontend.yaml"
kubectl apply -f k8s_files/frontend.yaml
echo "[root@rhel3 ~]# kubectl get service"
kubectl get service
echo ""
echo "[root@rhel3 ~]# kubectl get pods"
kubectl get pods
