clear
echo "[root@rhel3 ~]# cat ../k8s_files/pvcforsan.yaml"
cat ../k8s_files/pvcforsan.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/pvcfornas.yaml"
cat ../k8s_files/pvcfornas.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pvcfornas.yaml"
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pvcforsan.yaml"
kubectl create -f ../k8s_files/pvcfornas.yaml
kubectl create -f ../k8s_files/pvcforsan.yaml
echo "[root@rhel3 ~]# kubectl get pvc"
kubectl get pvc
