#!/bin/bash
echo "#######################################################################################################"
echo "kubeadm join in the k8s worker node"
echo "#######################################################################################################"

systemctl daemon-reload && systemctl start kubelet
kubeadm reset -f
kubeadm join 192.168.0.64:6443 --token abcdef.0123456789abcdef --discovery-token-unsafe-skip-ca-verification

