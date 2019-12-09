# Demo Trident
Scripts and ansible playbooks to modify the NetApp Lab on Demand [Using Trident with Kubernetes and ONTAP v3.0](https://labondemand.netapp.com/lab/sl10556) and show the advantages to use ONTAP as a backend storage for Kubernetes and OpenShift

## Configure the demo

```
> git clone https://github.com/pablogarciaarevalo/demo-trident
> cd demo-trident
> chmod 744 *
> ./configure_demo.sh
```
## Running

Check the steps_for_the_demo.txt file to show the steps and comments.

In the playbooks folder, show, explain and run the day0-1.yml file.

Run sequentially the k8s examples in the examples folder.

In the playbooks folder, edit the day2.yml file and include the NFS volume name in the source_volume_to_protect var (<replace_here>). Explain and run the day2.yml file.