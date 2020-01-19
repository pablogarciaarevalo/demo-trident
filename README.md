# Demo Trident
Scripts and ansible playbooks to modify the NetApp Lab on Demand [Using Trident with Kubernetes and ONTAP v3.1](https://labondemand.netapp.com/lab/sl10556) and to show the advantages to use ONTAP as a backend storage for Kubernetes and OpenShift. The demo is shown in 5 sections:

* [Module 1: Deployment & Provisioning](#module-1-deployment--provisioning)
* [Module 2: Kubernetes Storage Provisioning with Trident 101](#module-2-kubernetes-storage-provisioning-with-trident-101)
* [Module 3: New tier application architecture with Kubernetes](#module-3-new-tier-application-architecture-with-kubernetes)
* [Module 4: Advanced NetApp Trident features](#module-4-advanced-netapp-trident-features)
* [Module 5: Configuration Management](#module-5-configuration-management)

## Preparing the demo

Open the putty on the jumphost and connect to the kubernetes master node root@rhel3. Run the below commands:

```shell
git clone https://github.com/pablogarciaarevalo/demo-trident
cd demo-trident
chmod 744 *
./configure_demo.sh
```

Open the slides in the browser http://rhel6.demo.netapp.com/demo.pdf.

## Module 1: Deployment & Provisioning

### Show the demo kubernetes cluster

- Objetive: Show the kubernetes cluster in order to understand the demo.

> Go to slide 2

Run the below commands:

```shell
kubectl get nodes
tridentctl version -n trident
kubectl get crds
kubectl get deployment -n trident
```

### Ansible phases days 0 & 1: Deployment & Provisioning

- Objetive: An Infrastructure as a Code software like Ansible is needed to automate when using Kubernetes. Ansible Phases 0 & 1 automates device bring up.

> Go to slide 3

Run the below commands and explain the Ansible playbook to automate the ONTAP provisioning:

```shell
cd ansible_playbooks/
cat day0-1.yaml
ansible-playbook day0-1.yaml
cd ..
```

## Module 2: Kubernetes Storage Provisioning with Trident 101

### Create NetApp Trident backend

- Objetive: A Trident backend defines the relationship between Trident and a storage system. It tells Trident how to communicate with that storage system. Tasks to do by the IT Storage Administrator.

> Go to slide 4

Run the below commands:

```shell
cd examples/

./01_create_k8s_backends.sh
```

### Show the Kubernetes Storage Classes

- Objetive: A StorageClass provides a way for administrators to describe the 'classes' of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. Trident moves the ONTAP's advantages to the containers and kubernetes solutions.

Run the below commands:

```shell
./02_check_k8s_storageclasses.sh
```

### Dynamic Kubernetes Persistent Volumes Provisioning with Trident

- Objetive: Persistent Volume Claims (or PVCs) are objects that request storage resources from a cluster. It shows how to run Read Write Many Persistent Volumes and Read Write Once Persistent Volumes.

| PV Access Modes | Abbreviated |    Volume    | As known as |
| --------------- |:-----------:| ------------ | ----------- |
|  ReadWriteMany  |     RWX     |      NFS     |     NAS     |
|  ReadWriteOnce  |     RWO     | iSCSI or NFS |     SAN     |
|  ReadOnlyMany   |     ROX     | iSCSI or NFS |             |

> Go to slide 5

Run the below command:

```shell
./03_create_pvc.sh
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

- Objetive: Run similar pods binding the same PV on the same kubernetes worker and different workers.

> Go to slide 7

Run the below commands:

```shell
kubectl get pods -o wide

./05_scale_pods_manually.sh

kubectl get pods -o wide
```

All the pods with RWM PV will be running regardless of the worker on which they are scheduled. Only the pods with RWO scheduled on the worker rhel1 will be running. There is a Multi-Attach error for the RWO volume mount in the pods which are not scheduled in the worker rhel1. The reason is because ReadWriteMany (RMX) access is for workers not for pods. Focus on that usually the applications need RWM or RWO access. It depends on the application but K8S needs unified storage.

> Go to slide 8

### Sidecar Pod

- Objetive: Run a pod with two containers, the first one writes data in a shared volume and the second one reads the data. ReadWriteMany access mode should fit better.

> Go to slide 9

Run the below command:

```shell
./06_sidecar_pod.sh
```

### PVC RWO using NAS

- Objetive: Read Write Only access mode can be block (iSCSI) or file (NFS). Some applications don't run fast in NFS, like Kafka, but it's not an issue in the NAS side. A NAS is not slower.

> Go to slide 10

Run the below command:

```shell
./07_pod_pvc_rwo.sh
```

## Module 3: New tier application architecture with Kubernetes

### Sample cloud-native application with 10 microservices by GCP 

- Objetive: Data storage is not really important, the applications are. But Trident with the NetApp storage provides some advantages with the ONTAP features that allows the application works better (efficiency, scale, security, portability,...).

> Go to slide 11

Set focus on the microservices Frontend and Cache (Redis), which can use RWM PV and RWO PV respectively. Again, K8S needs unified storage.

### Create Kubernetes dummy frontend statefulset with ReadWriteMany Persistent Volume

- Objetive: Show how to create and scale a frontend deployment accessing a single ReadWriteMany Persistent Volume (NFS)

> Go to slide 12 and 13

Run the below commands:

```shell
./08_create_frontend_service.sh

kubectl get pods -o wide
kubectl get pvc
kubectl get pv
```

Scaling the statefulset:

```shell
kubectl scale --replicas=5 statefulset frontend
kubectl get pods -o wide
```

### Create Kubernetes dummy backend statefulset with ReadWriteOnce Persistent Volume

- Objetive: Show how to create and scale a backend deployment accessing a single ReadWriteOnce Persistent Volume (iSCSI)

> Go to slide 14

Run the below commands:

```shell
./09_create_backend_service.sh

kubectl get pods
kubectl get pvc
```

Scaling the statefulset:

```shell
kubectl scale --replicas=5 statefulset mongodb
kubectl get pods 
```

## Module 4: Advanced NetApp Trident features

### Volume Import

- Objetive: Explain the Trident Volume Import feature and some use cases. The demo shows a legacy website with the content in a NetApp NFS volume, and the procedure to import the webpage in Kubernetes as a pod. **Note that the demo shows a website to understand it better but consider a database**.

> Go to slide 15 and 16

Open a browser http://rhel6.demo.netapp.com/


Run the below commands:

```shell
./10_import_web_service.sh

kubectl get pvc -n web
```

Run the below command to get the kubernetes services IP address:

```shell
kubectl get all -n web
```

Open a browser http://192.168.0.140

> Go to slide 17

Scale the statefulset:

```shell
kubectl scale --replicas=5 statefulset web-v1 -n web
```

### Kubernetes Volume Snapshots

- Objetive: The container storage interface (CSI) is a standardized API for container orchestrators to manage storage plugins. NetApp Trident has been deployed a CSI plugin. Kubernetes 1.12 includes Volume Snapshots as a Alpha, and Kubernetes 1.17 does it as a Beta. 

> Go to slide 18

Run the below command:

```shell
./11_create_ondemand_snapshot.sh
```

Run the below command from ONTAP:

```shell
ontap> snapshot show
```

Browser the .snapshot directory

```shell
kubectl exec -it web-v1-0 /bin/sh -n web 
ls -altr /usr/share/nginx/html/.snapshot
exit
```

### Kubernetes Persisten Volume Claim from Snapshot (aka Clone)

- Objetive: Note that right now, up to kubernetes 1.17, a Volume snapshot can not be restored. What can we do with a volume snapshot? Cloning.

> Go to slide 19

Run the below command:

```shell
./12_create_staging_web_service.sh
```

> Go to slide 20

Run the below commands:

```shell
kubectl get pv
kubectl get all -n web
```

Run the below command from ONTAP:

```shell
volume clone show
```

Open a browser http://192.168.0.141

Run the below command to modify the data

```shell
./13_coding_new_website.sh
```

Open a browser in incognito mode http://192.168.0.141

## Module 5: Configuration Management 

### Ansible phase 2: Configuration Management

- Objetive: Ansible Phases 2 optimizes compliance and operation.

> Go to slide 21

Run the below commands:

```shell
cd ../ansible_playbooks/
cat pvc-name.json
```

Run the below command:

```shell
ansible-playbook day2.yaml -e "@pvc-name.json"
```

Run the below command from ONTAP:

```shell
ontap> snapmirror show
```
