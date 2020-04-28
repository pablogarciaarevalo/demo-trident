#!/bin/bash

clear
echo "[root@rhel3 ~]# wget https://github.com/NetApp/trident/releases/download/v20.01.1/trident-installer-20.01.1.tar.gz"
wget https://github.com/NetApp/trident/releases/download/v20.01.1/trident-installer-20.01.1.tar.gz
echo "[root@rhel3 ~]# tar -xf trident-installer-20.01.1.tar.gz"
tar -xf trident-installer-20.01.1.tar.gz
echo "[root@rhel3 ~]# cd trident-installer"
cd trident-installer
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/demo-trident/demo/trident-installer:/root/bin
echo "[root@rhel3 ~]# tridentctl obliviate alpha-snapshot-crd"
tridentctl obliviate alpha-snapshot-crd
echo "[root@rhel3 ~]# tridentctl install -n trident"
tridentctl install -n trident

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
