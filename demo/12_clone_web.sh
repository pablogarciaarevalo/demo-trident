#!/bin/bash

clear
echo "[root@rhel3 ~]# cat volume-name.txt"
cat volume-name.txt
echo ""
volumeName=$(cat volume-name.txt)
cloneJson="{\"name\":\"web_content_dev\",\"clone\":{\"parent_volume\": {\"name\": \"$volumeName\"},\"is_flexclone\":\"true\"},\"svm\":{\"name\": \"svm1\"}}"

echo "[root@rhel3 ~]# curl -k -X POST  \"https://cluster1.demo.netapp.com/api/storage/volumes\" -H \"accept: application/hal+json\" -H 'authorization: Basic YWRtaW46TmV0YXBwMSE=' -d '{\"name\":\"web_content_dev\",\"clone\":{\"parent_volume\": {\"name\": \"$volumeName\"},\"is_flexclone\":\"true\"},\"svm\":{\"name\": \"svm1\"}}'"
curl -k -X POST 'https://cluster1.demo.netapp.com/api/storage/volumes' -H 'accept: application/hal+json' -H 'authorization: Basic YWRtaW46TmV0YXBwMSE=' -d "$cloneJson"
