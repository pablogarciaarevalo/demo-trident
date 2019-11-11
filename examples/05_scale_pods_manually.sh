clear
echo "[root@rhel3 ~]# cat ../k8s_files/pv-alpine-nas2.yaml"
cat ../k8s_files/pv-alpine-nas2.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/pv-alpine-nas3.yaml"
cat ../k8s_files/pv-alpine-nas3.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/pv-alpine-san2.yaml"
cat ../k8s_files/pv-alpine-san2.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/pv-alpine-san3.yaml"
cat ../k8s_files/pv-alpine-san3.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pv-alpine-nas2.yaml"
kubectl create -f ../k8s_files/pv-alpine-nas2.yaml
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pv-alpine-san2.yaml"
kubectl create -f ../k8s_files/pv-alpine-san2.yaml
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pv-alpine-nas3.yaml"
kubectl create -f ../k8s_files/pv-alpine-nas3.yaml
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pv-alpine-san3.yaml"
kubectl create -f ../k8s_files/pv-alpine-san3.yaml
