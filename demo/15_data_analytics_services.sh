#!/bin/bash

clear
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/pods-bryan.yaml"
kubectl apply -f k8s_files/pods-bryan.yaml
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/pods-harry.yaml"
kubectl apply -f k8s_files/pods-harry.yaml
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/pods-john.yaml"
kubectl apply -f k8s_files/pods-john.yaml
echo ""

echo "[root@rhel3 ~]# kubectl get all -n data-analytics"
kubectl get all -n data-analytics