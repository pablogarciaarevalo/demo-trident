#!/bin/bash

echo "#######################################################################################################"
echo "Installing Ansible & NetApp library"
echo "#######################################################################################################"

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

echo "#######################################################################################################"
echo "Configuring NetApp volumes for examples using Ansible playbooks"
echo "#######################################################################################################"

ansible-playbook ./ansible_files/legacy-website.yaml
ansible-playbook ./ansible_files/datalake.yaml

echo "#######################################################################################################"
echo "Run web server within docker for one example"
echo "#######################################################################################################"

mkdir /mnt/web_content
mount -t nfs 192.168.0.132:/web_content /mnt/web_content
cp -r netapp_website/v1/* /mnt/web_content
docker -H ssh://root@rhel6 run --name docker-nginx -p 80:80 -d -v /mnt/web_content:/usr/share/nginx/html nginx

echo "#######################################################################################################"
echo "Delete the configured K8S Storage Classes and backend, and uninstall trident"
echo "#######################################################################################################"

kubectl delete sc storage-class-nas
kubectl delete sc storage-class-ssd
kubectl delete sc storage-class-storagepool
kubectl delete sc sf-gold
kubectl delete sc sf-silver
tridentctl delete backend BackendForNAS -n trident
tridentctl delete backend BackendForSolidFire -n trident
tridentctl uninstall -n trident


echo "#######################################################################################################"
echo "Install and create a metallb configuration"
echo "#######################################################################################################"

kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.8.3/manifests/metallb.yaml
kubectl apply -f k8s_files/metailb-configmap-k8s-prod.yaml

echo "#######################################################################################################"
echo "Enable the VolumeSnapshotDataSource feature gate in the kube apiserver, controller and scheduller"
echo "#######################################################################################################"

yes | cp k8s_files/kube-apiserver.yaml /etc/kubernetes/manifests/
yes | cp k8s_files/kube-controller-manager.yaml /etc/kubernetes/manifests/
yes | cp k8s_files/kube-scheduler.yaml /etc/kubernetes/manifests/

echo "#######################################################################################################"
echo "Initialize and configure the second kubernetes cluster"
echo "#######################################################################################################"

ssh -o "StrictHostKeyChecking no" root@rhel4 < ./01_prepare_k8s_servers.sh
ssh -o "StrictHostKeyChecking no" root@rhel5 < ./01_prepare_k8s_servers.sh
ssh -o "StrictHostKeyChecking no" root@rhel6 < ./01_prepare_k8s_servers.sh

ssh -o "StrictHostKeyChecking no" root@rhel4 < ./02_init_k8s_master.sh

ssh -o "StrictHostKeyChecking no" root@rhel5 < ./03_join_k8s_workers.sh
ssh -o "StrictHostKeyChecking no" root@rhel6 < ./03_join_k8s_workers.sh

ssh -o "StrictHostKeyChecking no" root@rhel4 < ./04_configure_k8s_cluster.sh

chmod 744 * ../demo/*.sh
chmod 744 * ../demo/k8s_backup/*.sh