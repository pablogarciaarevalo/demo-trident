
yum -y install ansible
yum -y install python-pip 
pip install netapp-lib --user

cat <<EOT >> /etc/ansible/hosts
[k8sservers]
rhel1
rhel2
rhel3
EOT

export ANSIBLE_HOST_KEY_CHECKING=False

ansible-playbook ./01_start/configure_ontap_svm_for_iscsi.yml
ansible-playbook ./01_start/connect_iscsi_initiators.yml

tridentctl create backend --filename ./02_k8s_example/backend-san.json -n trident
kubectl create -f ./02_k8s_example/sc-san.yaml
kubectl create -f ./02_k8s_example/gold.yaml

curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > install-helm.sh
chmod u+x install-helm.sh
./install-helm.sh

kubectl -n kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
