echo "> cat pv-alpine-nas2.yaml"
cat pv-alpine-nas2.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> cat pv-alpine-nas3.yaml"
cat pv-alpine-nas3.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> cat pv-alpine-san2.yaml"
cat pv-alpine-san2.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> cat pv-alpine-san3.yaml"
cat pv-alpine-san3.yaml
read -p "Press any key to continue... " -n1 -s
clear
echo "> kubectl create -f pv-alpine-nas2.yaml"
kubectl create -f pv-alpine-nas2.yaml
echo "> kubectl create -f pv-alpine-san2.yaml"
kubectl create -f pv-alpine-san2.yaml
echo "> kubectl create -f pv-alpine-nas3.yaml"
kubectl create -f pv-alpine-nas3.yaml
echo "> kubectl create -f pv-alpine-san3.yaml"
kubectl create -f pv-alpine-san3.yaml
