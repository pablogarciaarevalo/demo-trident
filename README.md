# Demo Trident
Scripts and ansible playbooks to modify the NetApp Lab on Demand [Using Trident with Kubernetes and ONTAP v3.0](https://labondemand.netapp.com/lab/sl10556) and show the advantages to use ONTAP as a backend storage for kubernetes.

## Prepare the demo

```
> git clone https://github.com/pablogarciaarevalo/demo-trident
> cd demo-trident
> chmod 744 *
> ./configure_demo.sh
```
## Running

In the playbooks folder, show, explain and run the day0-1.yml file.

In the examples folder, run sequentially the k8s examples

In the playbooks folder, edit the day2.yml file and include the NFS volume name in the source_volume_to_protect var (<replace_here>). Explain and run the day2.yml file.