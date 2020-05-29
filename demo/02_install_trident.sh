#!/bin/bash

clear
echo "[root@rhel3 ~]# wget https://github.com/NetApp/trident/releases/download/v20.04.0/trident-installer-20.04.0.tar.gz"
wget https://github.com/NetApp/trident/releases/download/v20.04.0/trident-installer-20.04.0.tar.gz
echo "[root@rhel3 ~]# tar -xf trident-installer-20.04.0.tar.gz"
tar -xf trident-installer-20.04.0.tar.gz
echo "[root@rhel3 ~]# cd trident-installer"
cd trident-installer

# Run twice the obliviate alpha-snapshot-crd command due to a known issue
echo "[root@rhel3 ~]# tridentctl obliviate alpha-snapshot-crd"
tridentctl obliviate alpha-snapshot-crd
tridentctl obliviate alpha-snapshot-crd

# Installing Trident without the operator

echo "[root@rhel3 ~]# tridentctl install -n trident"
tridentctl install -n trident
echo ""
echo "[root@rhel3 ~]# kubectl get all -n trident"
kubectl get all -n trident
echo ""
read -p "Press any key to continue... " -n1 -s
clear

# Show Trident version
echo "[root@rhel3 ~]# tridentctl version -n trident"
tridentctl version -n trident
echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "Enabling snapshots for K8s 1.17 or later"
# Install Snapshot Beta CRDs per cluster
echo "[root@rhel3 ~]# kubectl create -f  https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml"
kubectl create -f  https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml
echo "[root@rhel3 ~]# kubectl create -f  https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml"
kubectl create -f  https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml
echo "[root@rhel3 ~]# kubectl create -f  https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml"
kubectl create -f  https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml

# Install Snapshot Controller per cluster
echo "[root@rhel3 ~]# kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/deploy/kubernetes/snapshot-controller/rbac-snapshot-controller.yaml"
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/deploy/kubernetes/snapshot-controller/rbac-snapshot-controller.yaml
echo "[root@rhel3 ~]# kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/deploy/kubernetes/snapshot-controller/setup-snapshot-controller.yaml"
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/release-2.0/deploy/kubernetes/snapshot-controller/setup-snapshot-controller.yaml
echo ""
