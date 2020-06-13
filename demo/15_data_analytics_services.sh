#!/bin/bash

clear
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/jupyter-bryan.yaml"
kubectl apply -f k8s_files/jupyter-bryan.yaml
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/jupyter-harry.yaml"
kubectl apply -f k8s_files/jupyter-harry.yaml
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/jupyter-john.yaml"
kubectl apply -f k8s_files/jupyter-john.yaml
echo ""

echo "[root@rhel3 ~]# kubectl get all -n data-analytics"
kubectl get all -n data-analytics