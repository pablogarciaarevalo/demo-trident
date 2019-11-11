
yum -y install ansible
yum -y install python-pip 
pip install netapp-lib --user

cat <<EOT >> /etc/ansible/hosts
[k8sservers]
rhel1
rhel2
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

# Simulate OpenShift cli
alias oc=kubectl

chmod 744 * ./examples/01_create_k8s_backends.sh
chmod 744 * ./examples/02_check_k8s_storageclasses.sh
chmod 744 * ./examples/03_create_pvc.sh
chmod 744 * ./examples/04_create_pods.sh
chmod 744 * ./examples/05_scale_pods_manually.sh
chmod 744 * ./examples/06_create_ondemand_snapshot.sh
chmod 744 * ./examples/07_create_frontend_service.sh
chmod 744 * ./examples/08_create_backend_service.sh


