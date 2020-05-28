#!/bin/bash


echo "#######################################################################################################"
echo "Include CentOS repository"
echo "#######################################################################################################"

cat <<EOF >> /etc/yum.repos.d/centos1.repo
[centos]
name=CentOS-7
baseurl=http://ftp.heanet.ie/pub/centos/7/os/x86_64/
enabled=1
gpgcheck=1
gpgkey=http://ftp.heanet.ie/pub/centos/7/os/x86_64/RPM-GPG-KEY-CentOS-7
EOF
yum repolist

echo "#######################################################################################################"
echo "Installing Ansible & NetApp library"
echo "#######################################################################################################"

yum -y install ansible
yum -y install python-pip 
pip install --upgrade pip
pip install netapp-lib --user

cat <<EOF >> /etc/ansible/hosts
rhel6
[k8sservers]
rhel1
rhel2
EOF

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
echo "Upgrading to K8s 1.16"
echo "#######################################################################################################"

yum install -y kubeadm-1.16.7-0 --disableexcludes=kubernetes
kubeadm upgrade apply v1.16.7 -y
yum install -y kubelet-1.16.7-0 kubectl-1.16.7-0 --disableexcludes=kubernetes
systemctl restart kubelet
systemctl daemon-reload
sleep 30s

ssh -o "StrictHostKeyChecking no" root@rhel1 yum install -y kubeadm-1.16.7-0 --disableexcludes=kubernetesclear
ssh -o "StrictHostKeyChecking no" root@rhel1 kubeadm upgrade node 
ssh -o "StrictHostKeyChecking no" root@rhel1 yum install -y kubelet-1.16.7-0 kubectl-1.16.7-0 --disableexcludes=kubernetes
ssh -o "StrictHostKeyChecking no" root@rhel1 systemctl restart kubelet
ssh -o "StrictHostKeyChecking no" root@rhel1 systemctl daemon-reload
sleep 30s

ssh -o "StrictHostKeyChecking no" root@rhel2 yum install -y kubeadm-1.16.7-0 --disableexcludes=kubernetesclear
ssh -o "StrictHostKeyChecking no" root@rhel2 kubeadm upgrade node 
ssh -o "StrictHostKeyChecking no" root@rhel2 yum install -y kubelet-1.16.7-0 kubectl-1.16.7-0 --disableexcludes=kubernetes
ssh -o "StrictHostKeyChecking no" root@rhel2 systemctl restart kubelet
ssh -o "StrictHostKeyChecking no" root@rhel2 systemctl daemon-reload
sleep 30s

echo "#######################################################################################################"
echo "Upgrading to K8s 1.17"
echo "#######################################################################################################"

yum install -y kubeadm-1.17.3-0 --disableexcludes=kubernetes
kubeadm upgrade apply v1.17.3 -y
yum install -y kubelet-1.17.3-0 kubectl-1.17.3-0 --disableexcludes=kubernetes
systemctl restart kubelet
systemctl daemon-reload
sleep 30s

ssh -o "StrictHostKeyChecking no" root@rhel1 yum install -y kubeadm-1.17.3-0 --disableexcludes=kubernetesclear
ssh -o "StrictHostKeyChecking no" root@rhel1 kubeadm upgrade node 
ssh -o "StrictHostKeyChecking no" root@rhel1 yum install -y kubelet-1.17.3-0 kubectl-1.17.3-0 --disableexcludes=kubernetes
ssh -o "StrictHostKeyChecking no" root@rhel1 systemctl restart kubelet
ssh -o "StrictHostKeyChecking no" root@rhel1 systemctl daemon-reload
sleep 30s

ssh -o "StrictHostKeyChecking no" root@rhel2 yum install -y kubeadm-1.17.3-0 --disableexcludes=kubernetesclear
ssh -o "StrictHostKeyChecking no" root@rhel2 kubeadm upgrade node 
ssh -o "StrictHostKeyChecking no" root@rhel2 yum install -y kubelet-1.17.3-0 kubectl-1.17.3-0 --disableexcludes=kubernetes
ssh -o "StrictHostKeyChecking no" root@rhel2 systemctl restart kubelet
ssh -o "StrictHostKeyChecking no" root@rhel2 systemctl daemon-reload
sleep 30s
e
echo "#######################################################################################################"
echo "Upgrading to K8s 1.18"
echo "#######################################################################################################"

yum install -y kubeadm-1.18.0-0 --disableexcludes=kubernetes
kubeadm upgrade apply v1.18.0 -y
yum install -y kubelet-1.18.0-0 kubectl-1.18.0-0 --disableexcludes=kubernetes
systemctl restart kubelet
systemctl daemon-reload
sleep 30s

ssh -o "StrictHostKeyChecking no" root@rhel1 yum install -y kubeadm-1.18.0-0 --disableexcludes=kubernetesclear
ssh -o "StrictHostKeyChecking no" root@rhel1 kubeadm upgrade node 
ssh -o "StrictHostKeyChecking no" root@rhel1 yum install -y kubelet-1.18.0-0 kubectl-1.18.0-0--disableexcludes=kubernetes
ssh -o "StrictHostKeyChecking no" root@rhel1 systemctl restart kubelet
ssh -o "StrictHostKeyChecking no" root@rhel1 systemctl daemon-reload
sleep 30s

ssh -o "StrictHostKeyChecking no" root@rhel2 yum install -y kubeadm-1.18.0-0 --disableexcludes=kubernetesclear
ssh -o "StrictHostKeyChecking no" root@rhel2 kubeadm upgrade node 
ssh -o "StrictHostKeyChecking no" root@rhel2 yum install -y kubelet-1.18.0-0 kubectl-1.18.0-0 --disableexcludes=kubernetes
ssh -o "StrictHostKeyChecking no" root@rhel2 systemctl restart kubelet
ssh -o "StrictHostKeyChecking no" root@rhel2 systemctl daemon-reload
sleep 30s

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

echo "#######################################################################################################"
echo "Install and configure Prometheus and Grafana dashboards"
echo "#######################################################################################################"

# Install Helm

wget https://get.helm.sh/helm-v3.0.3-linux-amd64.tar.gz
tar xzvf helm-v3.0.3-linux-amd64.tar.gz
cp linux-amd64/helm /usr/bin/

# Install Prometheus and GRafana using the Prometheus operator

kubectl create namespace monitoring
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo update
helm install prom-operator stable/prometheus-operator --namespace monitoring

# Recreate the Prometheus service using a LoadBalancer type

kubectl delete -n monitoring svc prom-operator-prometheus-o-prometheus
kubectl apply -f /root/demo-trident/making/monitoring/prometheus/service-prom-operator-prometheus.yaml

# Create a Service Monitor for Trident

kubectl apply -f /root/demo-trident/making/monitoring/prometheus/servicemonitor.yaml

# Recreate the Grafana service using a LoadBalancer type

kubectl delete -n monitoring svc prom-operator-grafana
kubectl apply -f /root/demo-trident/making/monitoring/grafana/service-prom-operator-grafana.yaml

# Create configmap resources with the Grafana datasource and dashboards

kubectl apply -f /root/demo-trident/making/monitoring/grafana/cm-grafana-datasources.yaml
kubectl create configmap cm-grafana-dashboard -n monitoring --from-file=/root/demo-trident/making/monitoring/grafana/dashboards/

# Recreate the Grafana deployment using the previuos configmap resources to avoid manual configuration

kubectl delete deployment prom-operator-grafana -n monitoring
kubectl apply -f /root/demo-trident/making/monitoring/grafana/deployment-prom-operator-grafana.yaml

# Modify the Grafana GUI password setting 'admin'

kubectl patch secret -n monitoring prom-operator-grafana -p='{"data":{"admin-password": "YWRtaW4="}}' -v=1


echo "#######################################################################################################"
echo "Changing Trident path"
echo "#######################################################################################################"

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/demo-trident/demo/trident-installer:/root/bin
export PATH

cat <<EOF > ~/.bash_profile
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
        . ~/.bashrc
fi

# add path for tridentctl
PATH=$PATH:/root/demo-trident/demo/trident-installer

# User specific environment and startup programs
PATH=$PATH:$HOME/bin

export PATH

export KUBECONFIG=$HOME/.kube/config

EOF
