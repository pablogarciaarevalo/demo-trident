clear
echo "[root@rhel3 ~]# cat ../k8s_files/pvcforsan.yaml"
cat ../k8s_files/pvcforsan.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# cat ../k8s_files/pvcfornas.yaml"
cat ../k8s_files/pvcfornas.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pvcfornas.yaml"
echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pvcforsan.yaml"
kubectl create -f ../k8s_files/pvcfornas.yaml
kubectl create -f ../k8s_files/pvcforsan.yaml
echo "[root@rhel3 ~]# kubectl get pvc"
kubectl get pvc
echo ""
read -p "Press any key to continue... " -n1 -s
echo "curl -k -X GET 'https://cluster1.demo.netapp.com/api/storage/volumes' -H 'accept: application/json' -H 'authorization: Basic YWRtaW46TmV0YXBwMSE='"
curl -k -X GET "https://cluster1.demo.netapp.com/api/storage/volumes" -H "accept: application/json" -H "authorization: Basic YWRtaW46TmV0YXBwMSE="
