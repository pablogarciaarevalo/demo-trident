echo "> cat snap.yaml"
cat snap.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl create -f snap.yaml"
kubectl create -f snap.yaml
echo "> kubectl get volumesnapshots"
kubectl get volumesnapshots
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl describe volumesnapshot pvc1-snap"
kubectl describe volumesnapshot pvc1-snap
