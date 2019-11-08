echo "> cat mongodb-sts.yaml"
cat mongodb-sts.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl create -f mongodb-sts.yaml"
kubectl create -f mongodb-sts.yaml
echo "> kubectl get service"
kubectl get service
echo "> kubectl get pods"
kubectl get pods
