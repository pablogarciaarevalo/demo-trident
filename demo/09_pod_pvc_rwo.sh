#!/bin/bash

clear
echo "[root@rhel3 ~]# cat k8s_files/pod-pvc-rwo.yaml"
cat k8s_files/pod-pvc-rwo.yaml

echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# kubectl apply -f k8s_files/pod-pvc-rwo.yaml"
kubectl apply -f k8s_files/pod-pvc-rwo.yaml
echo ""

echo "[root@rhel3 ~]# kubectl get pods"
kubectl get pods
echo ""

echo "[root@rhel3 ~]# kubectl get pvc"
kubectl get pvc