echo "> cat backend-san.json"
cat backend-san.json
read -p "Press any key to continue... " -n1 -s
clear
echo "> cat backend-nas.json"
cat backend-nas.json
read -p "Press any key to continue... " -n1 -s
clear
echo "> tridentctl create backend --filename backend-nas.json -n trident"
tridentctl create backend --filename backend-nas.json -n trident
echo "> tridentctl create backend --filename backend-san.json -n trident"
tridentctl create backend --filename backend-san.json -n trident
echo "> tridentctl get backends -n trident"
tridentctl get backends -n trident
