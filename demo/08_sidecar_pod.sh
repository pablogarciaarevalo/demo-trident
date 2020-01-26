#!/bin/bash

clear
echo "[root@rhel3 ~]# cat k8s_files/sidecar-pod.yaml"
cat k8s_files/sidecar-pod.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# kubectl apply -f k8s_files/sidecar-pod.yaml"
kubectl apply -f k8s_files/sidecar-pod.yaml

echo "[root@rhel3 ~]# kubectl get pods -o wide"
kubectl get pods -o wide
echo ""
read -p "Wait a few seconds and press any key to continue... " -n1 -s
echo "[root@rhel3 ~]# kubectl get pods -o wide"
kubectl get pods -o wide
echo ""
read -p "Press any key to continue... " -n1 -s
echo ""
echo "curl http://$(kubectl get pod sidecar-pod -o=jsonpath='{.status.podIP}')"
echo ""
curl http://$(kubectl get pod sidecar-pod -o=jsonpath='{.status.podIP}')
