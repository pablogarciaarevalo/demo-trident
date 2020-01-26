#!/bin/bash
clear 
echo "Coding new website..."
cd /root/demo-trident/making/netapp_website/v2 > /dev/null
tar -cvf netapp_website_v2.tar . > /dev/null
kubectl cp /root/demo-trident/making/netapp_website/v2/netapp_website_v2.tar web/web-dev-0:/usr/share/nginx/html/ > /dev/null
kubectl exec web-dev-0 -n web -- bash -c "tar -xvf /usr/share/nginx/html/netapp_website_v2.tar -C /usr/share/nginx/html" > /dev/null
echo "                              _nnnn_"
echo "     _________               dGGGGMMb"
echo "    / ======= \             @p~qp~~qMb"
echo "   / __________\            M|@||@) M|"
echo "  | ___________ |           @,----.JM|"
echo "  | | -       | |          JS^\__/  qKL"
echo "  | |         | |         dZP        qKRb"
echo "  | |_________| |        dZP          qKKb"
echo "  \=____________/       fZP            SMMb"
echo "  / ''''''''''  \       HZM            MMMM"
echo " / ::::::::::::: \      FqM            MMMM"
echo "(_________________)   __| ll.        |\dSoqML"
echo "                      |    l.       | MM \Zq"
echo "                      _)      \.___.,|     .."
echo "                      \____   )MMMMMP|   .."
echo "                            -         -- "
echo ""
read -p "Press any key to continue... " -n1 -s
clear
