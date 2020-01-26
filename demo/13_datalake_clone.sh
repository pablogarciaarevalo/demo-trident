#!/bin/bash

clear
echo "[root@rhel3 ~]# kubectl create namespace data-analytics"
kubectl create namespace data-analytics
echo ""

echo "[root@rhel3 ~]# tridentctl import volume BackendForNAS datalake -f k8s_files/datalake.yaml -n trident"
tridentctl import volume BackendForNAS datalake -f k8s_files/datalake.yaml -n trident
echo ""
echo "[root@rhel3 ~]# kubectl get pvc -n data-analytics"
kubectl get pvc -n data-analytics
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# cat ./k8s_files/snap-sc.yaml"
cat ./k8s_files/snap-sc.yaml
echo ""
echo "[root@rhel3 ~]# kubectl apply -f ./k8s_files/snap-sc.yaml"
kubectl apply -f ./k8s_files/snap-sc.yaml
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# cat k8s_files/snap-datalake.yaml"
cat k8s_files/snap-datalake.yaml
echo ""
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/snap-datalake.yaml"
kubectl apply -f k8s_files/snap-datalake.yaml  -n data-analytics
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# cat k8s_files/clone-datalake-bryan.yaml"
cat k8s_files/clone-datalake-bryan.yaml
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# kubectl apply -f k8s_files/clone-datalake-bryan.yaml  -n data-analytics"
kubectl apply -f k8s_files/clone-datalake-bryan.yaml  -n data-analytics
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/clone-datalake-harry.yaml  -n data-analytics"
kubectl apply -f k8s_files/clone-datalake-harry.yaml  -n data-analytics
echo "[root@rhel3 ~]# kubectl apply -f k8s_files/clone-datalake-john.yaml  -n data-analytics"
kubectl apply -f k8s_files/clone-datalake-john.yaml  -n data-analytics

echo ""
echo "[root@rhel3 ~]# kubectl get pvc -n data-analytics"
kubectl get pvc -n data-analytics
