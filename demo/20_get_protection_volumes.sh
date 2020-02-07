clear

SM_ID=$(curl --silent -k -X GET 'https://cluster1.demo.netapp.com/api/snapmirror/relationships' -H 'accept: application/json' -H 'authorization: Basic YWRtaW46TmV0YXBwMSE=' | grep uuid | tr -s ' ' | cut -d ' ' -f 3 | tr -d '\"')
echo ""
echo "curl -k -X GET \"https://cluster1.demo.netapp.com/api/snapmirror/relationships/${SM_ID}\" -H 'accept: application/json' -H 'authorization: Basic YWRtaW46TmV0YXBwMSE='"
curl -k -X GET "https://cluster1.demo.netapp.com/api/snapmirror/relationships/${SM_ID}" -H 'accept: application/json' -H 'authorization: Basic YWRtaW46TmV0YXBwMSE='

