
cat web-content-v2.yaml 
kubectl apply -f web-content-v2.yaml -n web

clear
echo "[root@rhel3 ~]# kubectl apply -f ../k8s_files/web-v1.yml -n web"
kubectl apply -f ../k8s_files/web-v1.yml -n web
echo "[root@rhel3 ~]# kubectl get all -n web"
kubectl get all -n web

