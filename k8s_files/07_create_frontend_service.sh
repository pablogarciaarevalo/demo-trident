echo "> cat frontend.yaml"
cat frontend.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl create -f frontend.yaml"
kubectl create -f frontend.yaml
echo "> kubectl get service"
kubectl get service
echo "> kubectl get pods"
kubectl get pods
