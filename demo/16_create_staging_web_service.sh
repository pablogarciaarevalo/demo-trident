#!/bin/bash

clear
echo "[root@rhel4 ~]# kubectl create namespace web"
kubectl create namespace web
echo ""
echo "[root@rhel4 ~]# tridentctl import volume BackendForNAS web_content_dev -f k8s_files/web-content-clone.yaml -n trident"
tridentctl import volume BackendForNAS web_content_dev -f k8s_files/web-content-clone.yaml -n trident
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel4 ~]# cat k8s_files/web-dev.yaml"
cat k8s_files/web-dev.yaml

echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel4 ~]# kubectl apply -f k8s_files/web-dev.yaml -n web"
kubectl apply -f k8s_files/web-dev.yaml -n web
echo ""
echo "[root@rhel4 ~]# kubectl get all -n web"
kubectl get all -n web

