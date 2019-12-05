
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

mkdir /mnt/web_content
mount -t nfs 192.168.0.132:/web_content /mnt/web_content
cp -r netapp_website/v1/* /mnt/web_content

ansible-playbook legacy-website.yaml

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

chmod 744 * ./examples/01_create_k8s_backends.sh
chmod 744 * ./examples/02_check_k8s_storageclasses.sh
chmod 744 * ./examples/03_create_pvc.sh
chmod 744 * ./examples/04_create_pods.sh
chmod 744 * ./examples/05_scale_pods_manually.sh
chmod 744 * ./examples/06_create_frontend_service.sh
chmod 744 * ./examples/07_create_backend_service.sh
chmod 744 * ./examples/08_import_web_service.sh
chmod 744 * ./examples/09_create_ondemand_snapshot.sh
chmod 744 * ./examples/10_create_staging_web_service.sh
chmod 744 * ./examples/11_coding_new_website.sh

kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.8.3/manifests/metallb.yaml
kubectl apply -f ./k8s_files/metailb-configmap.yaml

yes | cp ./k8s_files/kube-apiserver.yaml /etc/kubernetes/manifests/
yes | cp ./k8s_files/kube-controller-manager.yaml /etc/kubernetes/manifests/
yes | cp ./k8s_files/kube-scheduler.yaml /etc/kubernetes/manifests/
