clear
echo "[root@rhel3 ~]# cat ../k8s_files/pod-pvc-rwo.yaml"
cat ../k8s_files/pod-pvc-rwo.yaml

echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/pod-pvc-rwo.yaml"
kubectl create -f ../k8s_files/pod-pvc-rwo.yaml

echo "[root@rhel3 ~]# kubectl get pods"
kubectl get pods

echo "[root@rhel3 ~]# kubectl get pvc"
kubectl get pvc