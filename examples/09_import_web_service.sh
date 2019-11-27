clear
echo "[root@rhel3 ~]# kubectl create namespace web"
kubectl create namespace web
echo ""
echo "[root@rhel3 ~]# cat ../k8s_files/imported_pvc.yaml"
cat ../k8s_files/imported_pvc.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# tridentctl import volume BackendForNAS web_content -f ../k8s_files/imported_pvc.yaml -n web"
tridentctl import volume BackendForNAS web_content -f ../k8s_files/imported_pvc.yaml -n web
echo ""
echo "[root@rhel3 ~]# kubectl get pvc -n web"
kubectl get pvc -n web
echo "[root@rhel3 ~]# kubectl get pv -n web"
kubectl get pv -n web
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/web.yml"
cat ../k8s_files/web.yml
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl apply -f ../k8s_files/web.yml -n web"
kubectl apply -f ../k8s_files/web.yml -n web
echo "[root@rhel3 ~]# kubectl get all -n web"
kubectl get all -n web
