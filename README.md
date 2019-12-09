# Demo Trident
Scripts and ansible playbooks to modify the NetApp Lab on Demand [Using Trident with Kubernetes and ONTAP v3.0](https://labondemand.netapp.com/lab/sl10556) and show the advantages to use ONTAP as a backend storage for Kubernetes and OpenShift.

## Preparing the demo

```shell
git clone https://github.com/pablogarciaarevalo/demo-trident
cd demo-trident
chmod 744 *
./configure_demo.sh
```

Open the PDF with the images in the browser http://rhel6.demo.netapp.com/demo.pdf

## Module 1: Kubernetes Storage Provisioning with Trident 101

### Show the demo kubernetes cluster

- Objetive: Show the kubernetes cluster in order to understand the demo

> Go to slide 2

Run the below commands:

```shell
kubectl get nodes
kubectl get pods --all-namespaces
tridentctl version -n trident
kubectl get crds
kubectl get deployment -n trident
```

### Ansible phases days 0 & 1: Deployment & Provisioning

- Objetive: An Infrastructure as a Code software like Ansible is needed to automate when using Kubernetes. Ansible Phases 0 & 1 automates device bring up.

> Go to slide 3

Run the below commands and explain the used Ansible playbook to automate the ONTAP provisioning:

```shell
cd ansible_playbooks/
cat day0-1.yml
ansible-playbook day0-1.yaml
cd ..
```

### Create NetApp Trident backend

- Objetive: A Trident backend defines the relationship between Trident and a storage system. It tells Trident how to communicate with that storage system. Task to do by the IT Storage Administrator

> Go to slide 4

Run the below commands:

```shell
cd examples/

./01_create_k8s_backends.sh
```

### Show the Kubernetes Storage Classes

- Objetive: A StorageClass provides a way for administrators to describe the “classes” of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. Trident moves the ONTAP's advantages to the containers and kubernetes solutions

Run the below commands:

```shell
./02_check_k8s_storageclasses.sh
```

### Dynamic Kubernetes Persistent Volumes Provisioning with Trident

- Objetive: Persistent Volume Claims (or PVCs) are objects that request storage resources from your cluster. It shows how to run RWM (Read Write Many) PVC and RWO (Read Write Once) PVC to get Kubernetes Persistent Volumes (PV). RWM =  NFS, RWO = NFS or iSCSI. however, we can understand RWM as NAS and RWO as SAN.

> Go to slide 5

Run the below command:

```shell
./03_create_pvc.sh
```

Run the below command in ONTAP:

```shell
ontap> volume show -vserver svm1
```

### Create Pods and bind the previous Persistent Volumes

- Objetive: Show how to bind RWM and RWO Persistent Volumes to a PODs. Show how the volumes are mounting.

> Go to slide 6

Run the below command, noting that the YAML files are scheduling manually the Pods in the node rhel1 instead of using the kubernetes scheduler.

```shell
./04_create_pods.sh

kubectl exec -it pvpod-nas1 mount | grep /data
kubectl exec -it pvpod-san1 mount | grep /data
```

### Scale the Pods manually

- Objetive: Run similar pods binding the same PV on the same and another kubernetes workers.

Run the below commands:

```shell
kubectl get pods -o wide

./05_scale_pods_manually.sh
kubectl get pods -o wide
```

All the pods with RWM PV will be running regardless of the worker on which they are scheduled. Only the pods with RWO scheduled on the worker rhel1 arwill bee running. There is a Multi-Attach error for the volume mount in the pods which are not scheduled in the worker rhel1. ReadWriteMany (RMX) access is for workers not for pods. Focus on that usually the applications need RWM or RWO access. Depends on the application. K8S needs unified storage.

> Go to slide 7

## Module 2: New tier application architecture with Kubernetes

### Sample cloud-native application with 10 microservices by GCP 

- Objetive: Data storage is not really important, the applications are. But Trident with the NetApp storage provides some advantages with the ONTAP features that allows the application works better (efficiency, scale, security, portability,...).

> Go to slide 8

Set focus on the microservices Frontend and Cache (Redis), which can use RWM PV and RWO PV respectively. Again, K8S needs unified storage.

### Create Kubernetes dummy frontend statefulset with ReadWriteMany Persistent Volume

- Objetive: Show how to create and scale a frontend deployment accessing a single ReadWriteMany Persistent Volume (NFS)

> Go to slide 9 and 10

Run the below commands:

```shell
./06_create_frontend_service.sh

kubectl get pods -o wide
kubectl get pvc
kubectl get pv
```

Scaling the deployment:

```shell
kubectl scale --replicas=5 statefulset frontend
kubectl get pods -o wide
```

### Create Kubernetes dummy backend statefulset with ReadWriteOnce Persistent Volume

- Objetive: Show how to create and scale a backend deployment accessing a single ReadWriteOnce Persistent Volume (iSCSI)

> Go to slide 11

Run the below commands:

```shell
./07_create_backend_service.sh

kubectl get pods
kubectl get pvc
```

Scaling the deployment:

```shell
kubectl scale --replicas=5 statefulset mongodb
kubectl get pods 
```

## Module 3: Advanced NetApp Trident features

### Volume Import

- Objetive: Explain the Trident Volume Import feature and some use cases. The demo shows a legacy website with the content in a NetApp NFS volume, and the procedure to import the service in Kubernetes as a pod. Note that the demo shows a website to understand it better but consider a database.

> Go to slide 12 and 13

Open a browser http://rhel6.demo.netapp.com/


Run the below commands:

```shell
./08_import_web_service.sh

kubectl get pvc -n web
```

* Copy the volume name to a notepad. We'll need it in the last step *
* ONTAP_volume_name = "trident_" + $PVC_name *
* [root@rhel3]# kubectl get pvc -n web *
* NAME             STATUS   VOLUME             *                     
* web-content-v1   Bound    pvc-920fef59-a5a4-4f2f-80da-9ea4e4eff42e *
*ONTAP_volume_name = trident_pvc_920fef59_a5a4_4f2f_80da_9ea4e4eff42e *

```shell
kubectl get all -n web
```

Open a browser http://192.168.0.140

kubectl scale --replicas=5 statefulset web-v1 -n web

 ---------------------------
| --> PPT 14                |
 ---------------------------

------------------------------------------------------------------------
SNAPSHOTS

 ---------------------------
| --> PPT 15                |
 ---------------------------

- Take a snapshot (K8S native)

./09_create_ondemand_snapshot.sh

ontap> snapshot show


- Browser in the .snapshot directory

kubectl exec -it web-v1-0 /bin/sh -n web 
ls -altr /usr/share/nginx/html/.snapshot
exit

------------------------------------------------------------------------
CLONE FOR STAGING

 ---------------------------
| --> PPT 16                |
 ---------------------------

./10_create_staging_web_service.sh

 ---------------------------
| --> PPT 17                |
 ---------------------------

kubectl get pv
volume clone show

Firefox to to http://192.168.0.141

./11_coding_new_website.sh

Chrome to http://192.168.0.141



------------------------------------------------------------------------
### Ansible Day 2 CONFIGURATION MANAGEMENT

 ---------------------------
| --> PPT 18 	  			|
 ---------------------------


cd ../ansible_playbooks/
vi day2.yml: 
  modify the source_volume_to_protect: <replace_here>
  
ansible-playbook day2.yaml

ontap> snapmirror show











Check the steps_for_the_demo.txt file to show the steps and comments.

In the playbooks folder, show, explain and run the day0-1.yml file.

Run sequentially the k8s examples in the examples folder.

In the playbooks folder, edit the day2.yml file and include the NFS volume name in the source_volume_to_protect var (<replace_here>). Explain and run the day2.yml file.