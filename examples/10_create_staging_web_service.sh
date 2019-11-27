clear
echo "[root@rhel3 ~]# cat ../k8s_files/web-content-v2.yaml"
cat ../k8s_files/web-content-v2.yaml 

echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# kubectl apply -f ../k8s_files/web-content-v2.yaml -n web"
kubectl apply -f ../k8s_files/web-content-v2.yaml -n web

echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# cat ../k8s_files/web-v1.yml"
cat ../k8s_files/web-v1.yml 

echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# kubectl apply -f ../k8s_files/web-v1.yml -n web"
kubectl apply -f ../k8s_files/web-v1.yml -n web
echo "[root@rhel3 ~]# kubectl get all -n web"
kubectl get all -n web

