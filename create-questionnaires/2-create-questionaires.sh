#!/bin/bash

mkdir -p questionnaires
rm -rf questionnaires/*

usersNumber=`wc -l participants.csv | cut -d' ' -f1`

for i in `seq 1 $usersNumber` ; 
do
        string=`sed -n $i\p participants.csv`
        surname=`echo $string | cut -d, -f 2`
        name=`echo $string | cut -d, -f 3`
	cd webpage
	rm -f processing.html
        cp index.html processing.html
        sed -i 's#<h2>Participant: </h2>#<h2>Participant: '$name' '$surname'</h2>#g' processing.html
        sed -i 's#<img class="right" src=""/>#<img class="right" src="img/'$name'+'$surname'.png"/>#g' processing.html
	wkhtmltopdf -s A4 -B 7 -R 7 -L 7 -T 12 processing.html 1.pdf
	mv 1.pdf ../questionnaires/$name\+$surname\.pdf	
	rm -f processing.html
	cd ../ 
done

