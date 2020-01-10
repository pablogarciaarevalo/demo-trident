
yum -y install ansible
yum -y install python-pip 
pip install netapp-lib --user

cat <<EOT >> /etc/ansible/hosts
rhel6
[k8sservers]
rhel1
rhel2
EOT

export ANSIBLE_HOST_KEY_CHECKING=False

ansible-playbook ./ansible_playbooks/legacy-website.yaml

mkdir /mnt/web_content
mount -t nfs 192.168.0.132:/web_content /mnt/web_content
cp -r netapp_website/v1/* /mnt/web_content
docker -H ssh://root@rhel6 run --name docker-nginx -p 80:80 -d -v /mnt/web_content:/usr/share/nginx/html nginx


kubectl delete sc storage-class-nas
kubectl delete sc storage-class-ssd
kubectl delete sc storage-class-storagepool
kubectl delete sc sf-gold
kubectl delete sc sf-silver


tridentctl delete backend BackendForNAS -n trident
tridentctl delete backend BackendForSolidFire -n trident

kubectl create -f ./k8s_files/sc-san.yaml
kubectl create -f ./k8s_files/sc-nas-gold.yaml
kubectl create -f ./k8s_files/sc-nas-silver.yaml

kubectl create -f ./k8s_files/snap-sc.yaml

kubectl patch storageclass san -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

chmod 744 * ./examples/*

kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.8.3/manifests/metallb.yaml
kubectl apply -f ./k8s_files/metailb-configmap.yaml

yes | cp ./k8s_files/kube-apiserver.yaml /etc/kubernetes/manifests/
yes | cp ./k8s_files/kube-controller-manager.yaml /etc/kubernetes/manifests/
yes | cp ./k8s_files/kube-scheduler.yaml /etc/kubernetes/manifests/
