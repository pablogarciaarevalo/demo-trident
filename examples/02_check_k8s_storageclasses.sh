clear
echo "[root@rhel3 ~]# kubectl get storageclass"
kubectl get storageclass
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/sc-san.yaml"
cat ../k8s_files/sc-san.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/sc-nas-gold.yaml"
cat ../k8s_files/sc-nas-gold.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/sc-nas-silver.yaml"
cat ../k8s_files/sc-nas-silver.yaml