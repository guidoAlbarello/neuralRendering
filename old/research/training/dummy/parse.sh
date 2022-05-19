name=$(echo $1 | cut -f 1 -d '.')
echo writing to $name.csv
cat $1 | tail -n +17 | gawk '{print $1, $2, $3, $4, $5}' OFS=, > $(echo ./fault_1_parse.csv)