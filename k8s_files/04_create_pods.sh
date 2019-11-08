echo "> cat pv-alpine-nas1.yaml"
cat pv-alpine-nas1.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> cat pv-alpine-san1.yaml"
cat pv-alpine-san1.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl create -f pv-alpine-nas1.yaml"
echo "> kubectl create -f pv-alpine-san1.yaml"
kubectl create -f pv-alpine-nas1.yaml
kubectl create -f pv-alpine-san1.yaml
echo "> kubectl get pods"
kubectl get pods
