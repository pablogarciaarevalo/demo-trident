echo "> cat pvcforsan.yaml"
cat pvcforsan.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> cat pvcfornas.yaml"
cat pvcfornas.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl create -f pvcfornas.yaml"
echo "> kubectl create -f pvcforsan.yaml"
kubectl create -f pvcfornas.yaml
kubectl create -f pvcforsan.yaml
echo "> kubectl get pvc"
kubectl get pvc
