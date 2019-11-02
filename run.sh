
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

kubectl delete sc storage-class-nas
kubectl delete sc storage-class-solidfire
kubectl delete sc storage-class-ssd
kubectl delete sc storage-class-storagepool
kubectl delete sc gold
kubectl delete sc silver
kubectl delete sc solidfire-bronze-two
kubectl delete sc solidfire-gold-four
kubectl delete sc solidfire-silver
kubectl delete sc solidfire-silver-one 
kubectl delete sc solidfire-silver-three


tridentctl delete backend BackendForNAS -n trident
tridentctl delete backend BackendForSolidFire -n trident

kubectl create -f ./k8s_files/sc-san.yaml
kubectl create -f ./k8s_files/sc-nas-gold.yaml
kubectl create -f ./k8s_files/sc-nas-silver.yaml

kubectl create -f ./k8s_files/snap-sc.yaml

kubectl patch storageclass san -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'


export ANSIBLE_HOST_KEY_CHECKING=False

