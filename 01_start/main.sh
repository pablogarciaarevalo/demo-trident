
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

ansible-playbook configure_ontap_svm_for_iscsi.yml
ansible-playbook connect_iscsi_initiators.yml

