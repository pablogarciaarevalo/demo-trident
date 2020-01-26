#!/bin/bash
echo "#######################################################################################################"
echo "Installing weave for the kubernetes network"
echo "#######################################################################################################"

export kubever=$(kubectl version | base64 | tr -d '\n')
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$kubever"

echo "#######################################################################################################"
echo "Waiting 30 seconds to allow the weave pods start properly"
echo "#######################################################################################################"

sleep 30s

echo "#######################################################################################################"
echo "Install and create a metallb configuration"
echo "#######################################################################################################"

kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.8.3/manifests/metallb.yaml
kubectl apply -f demo-trident/making/k8s_files/metailb-configmap-k8s-dev.yaml

echo "#######################################################################################################"
echo "Installing Trident"
echo "#######################################################################################################"

kubectl create ns trident
tridentctl install -n trident

echo "#######################################################################################################"
echo "Create K8S backend y Storage class"
echo "#######################################################################################################"

tridentctl create backend --filename demo-trident/demo/k8s_files/backend-nas.json -n trident
kubectl apply -f demo-trident/demo/k8s_files/sc-nas-silver.yaml



