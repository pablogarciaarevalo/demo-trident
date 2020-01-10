clear
echo "[root@rhel3 ~]# cat ../k8s_files/sidecar-pod.yaml"
cat ../k8s_files/sidecar-pod.yaml
echo ""
read -p "Press any key to continue... " -n1 -s
clear

echo "[root@rhel3 ~]# kubectl create -f ../k8s_files/sidecar-pod.yaml"
kubectl create -f ../k8s_files/sidecar-pod.yaml

echo "[root@rhel3 ~]# kubectl get pods"
kubectl get pods
echo ""
read -p "Press any key to continue... " -n1 -s
echo "[root@rhel3 ~]# kubectl get pods"
kubectl get pods
echo ""
read -p "Press any key to continue... " -n1 -s

echo "curl http://$(kubectl get pod sidecar-pod -o=jsonpath='{.status.podIP}')"
curl http://$(kubectl get pod sidecar-pod -o=jsonpath='{.status.podIP}')
