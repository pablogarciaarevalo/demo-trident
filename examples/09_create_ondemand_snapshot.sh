clear
echo "[root@rhel3 ~]# cat ../k8s_files/snap.yaml"
cat ../k8s_files/snap.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/snap.yaml -n web"
kubectl create -f ../k8s_files/snap.yaml -n web
echo "[root@rhel3 ~]# kubectl get volumesnapshots -n web"
kubectl get volumesnapshots -n web
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl describe volumesnapshot web-content-snap1 -n web"
kubectl describe volumesnapshot web-content-snap1 -n web
