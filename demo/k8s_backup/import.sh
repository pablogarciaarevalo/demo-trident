path=$(pwd)
for n in $(ls -d */)
do
	echo "Creating namespace ${n:0:-1}"
	kubectl create namespace ${n:0:-1}

	for yaml in $(ls $path/$n)
	do
		echo -e "\t Importing $yaml"
		kubectl apply -f $path/$n$yaml -n ${n:0:-1}
	done

done