
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
kubectl delete sc storage-class-san
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
tridentctl delete backend solidfire_192.168.0.130 -n trident
tridentctl delete backend BackendForSolidFire -n trident

tridentctl create backend --filename ./02_k8s_example/backend-nas.json -n trident
tridentctl create backend --filename ./02_k8s_example/backend-san.json -n trident

kubectl create -f ./02_k8s_example/sc-san.yaml
kubectl create -f ./02_k8s_example/sc-nas-gold.yaml
kubectl create -f ./02_k8s_example/sc-nas-silver.yaml

kubectl create -f ./02_k8s_example/snap-sc.yaml

kubectl patch storageclass san -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'


