clear
echo "[root@rhel3 ~]# cat ../k8s_files/snap.yaml"
cat ../k8s_files/snap.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/snap.yaml"
kubectl create -f ../k8s_files/snap.yaml
echo "[root@rhel3 ~]# kubectl get volumesnapshots"
kubectl get volumesnapshots
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl describe volumesnapshot pvc1-snap"
kubectl describe volumesnapshot pvc1-snap
