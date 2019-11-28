clear
echo "[root@rhel3 ~]# kubectl create namespace web"
kubectl create namespace web
echo ""
echo "[root@rhel3 ~]# cat ../k8s_files/web-content-v1.yaml"
cat ../k8s_files/web-content-v1.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# tridentctl import volume BackendForNAS web_content -f ../k8s_files/web-content-v1.yaml -n trident"
tridentctl import volume BackendForNAS web_content -f ../k8s_files/web-content-v1.yaml -n trident
echo ""
echo "[root@rhel3 ~]# kubectl get pvc -n web"
kubectl get pvc -n web
echo "[root@rhel3 ~]# kubectl get pv"
kubectl get pv
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/web-v1.yaml"
cat ../k8s_files/web-v1.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl apply -f ../k8s_files/web-v1.yaml -n web"
kubectl apply -f ../k8s_files/web-v1.yaml -n web
echo "[root@rhel3 ~]# kubectl get all -n web"
kubectl get all -n web
